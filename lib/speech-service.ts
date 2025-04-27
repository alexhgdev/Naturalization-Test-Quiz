import { toast } from "@/components/ui/use-toast"

interface SpeechRecognitionEvent extends Event {
    resultIndex: number
    results: {
        [index: number]: {
            [index: number]: {
                transcript: string
            }
            isFinal: boolean
        }
    }
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean
    interimResults: boolean
    lang: string
    start: () => void
    stop: () => void
    onresult: (event: SpeechRecognitionEvent) => void
    onend: () => void
    onerror: (event: SpeechRecognitionErrorEvent) => void
    onstart: () => void
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition
        webkitSpeechRecognition: new () => SpeechRecognition
    }
}

export class SpeechService {
    private recognition: SpeechRecognition | null = null
    private isListening = false
    private finalTranscript = ""
    private interimTranscript = ""
    private noiseFilterTimeout: NodeJS.Timeout | null = null

    constructor(
        private onTranscript: (text: string) => void,
        private onError: (error: string) => void,
        private onInterimTranscript: (text: string) => void
    ) {
        if (typeof window !== "undefined") {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            if (SpeechRecognition) {
                this.recognition = new SpeechRecognition()
                this.setupRecognition()
            } else {
                this.onError("Speech recognition is not supported in this browser. Please use Chrome or Edge.")
            }
        }
    }

    private setupRecognition() {
        if (!this.recognition) return

        // Configure speech recognition settings
        this.recognition.continuous = true
        this.recognition.interimResults = true
        this.recognition.lang = "en-US"

        // Lower confidence threshold for better sensitivity
        const confidenceThreshold = 0.3

        this.recognition.onresult = (event: SpeechRecognitionEvent) => {
            let interimTranscript = ""
            let finalTranscript = ""

            // Handle results using the SpeechRecognitionResultList interface
            for (let i = event.resultIndex; i < (event.results as any).length; i++) {
                const result = event.results[i]
                const transcript = result[0].transcript
                const confidence = (result[0] as any).confidence || 1.0

                // Process results with lower confidence threshold
                if (confidence >= confidenceThreshold) {
                    if (result.isFinal) {
                        finalTranscript += transcript
                    } else {
                        interimTranscript += transcript
                    }
                }
            }

            // Update transcripts
            if (finalTranscript) {
                this.finalTranscript = finalTranscript
                this.onTranscript(finalTranscript)
            }
            if (interimTranscript) {
                this.interimTranscript = interimTranscript
                this.onInterimTranscript(interimTranscript)
            }
        }

        this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            if (event.error === "no-speech") {
                // Ignore no-speech errors as they're common during pauses
                return
            }
            if (event.error === "not-allowed") {
                this.onError("Microphone access was denied. Please allow microphone access and try again.")
                return
            }
            this.onError(`Speech recognition error: ${event.error}`)
        }

        this.recognition.onend = () => {
            // Automatically restart if we were listening
            if (this.isListening) {
                this.startListening()
            }
        }

        // Add noise filtering using existing events
        this.recognition.onstart = () => {
            // Clear any existing noise filter timeout
            if (this.noiseFilterTimeout) {
                clearTimeout(this.noiseFilterTimeout)
            }
        }

        this.recognition.onend = () => {
            // Add a small delay before processing to filter out background noise
            this.noiseFilterTimeout = setTimeout(() => {
                if (this.interimTranscript) {
                    // Only process if the transcript is meaningful (not just noise)
                    if (this.interimTranscript.length > 2) {
                        this.onInterimTranscript(this.interimTranscript)
                    }
                    this.interimTranscript = ""
                }
            }, 500)
        }
    }

    public isAvailable(): boolean {
        return this.recognition !== null
    }

    public getListeningState(): boolean {
        return this.isListening
    }

    public startListening(): void {
        if (this.recognition && !this.isListening) {
            try {
                this.recognition.start()
                this.isListening = true
            } catch (error) {
                this.onError("Failed to start speech recognition. Please try again.")
            }
        }
    }

    public stopListening(): void {
        if (this.recognition && this.isListening) {
            try {
                this.recognition.stop()
                this.isListening = false
            } catch (error) {
                this.onError("Failed to stop speech recognition")
            }
        }
    }

    public toggleListening(): void {
        if (this.isListening) {
            this.stopListening()
        } else {
            this.startListening()
        }
    }
}

export async function textToSpeech(text: string) {
    try {
        const response = await fetch("/api/speech", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        })

        if (!response.ok) {
            throw new Error("Failed to convert text to speech")
        }

        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        await audio.play()
    } catch (error) {
        console.error("Error in textToSpeech:", error)
        toast({
            variant: "destructive",
            title: "Text-to-Speech Error",
            description: "Failed to convert text to speech. Please try again.",
        })
    }
} 