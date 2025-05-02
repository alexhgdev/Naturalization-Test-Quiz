import { toast } from "@/components/ui/use-toast"

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
    interpretation: any;
    emma: any;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;
    serviceURI: string;
    start(): void;
    stop(): void;
    abort(): void;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition
        webkitSpeechRecognition: new () => SpeechRecognition
    }
}

export interface VoiceOptions {
    voice?: string;
    pitch?: number;
    rate?: number;
}

interface QueueItem {
    text: string;
    options: VoiceOptions;
}

export class SpeechService {
    private recognition: any;
    private isListening: boolean = false;
    private shouldBeListening: boolean = false;
    private currentAudio: HTMLAudioElement | null = null;
    private audioQueue: { text: string; options: VoiceOptions }[] = [];
    private isProcessingQueue: boolean = false;
    private transcriptCallback: (text: string) => void;
    private errorCallback: (error: string) => void;
    private interimTranscriptCallback: (text: string) => void;
    private nextQuestionCallback: () => void;
    private validChoices: string[];

    constructor(
        transcriptCallback: (text: string) => void,
        errorCallback: (error: string) => void,
        interimTranscriptCallback: (text: string) => void,
        nextQuestionCallback: () => void,
        validChoices: string[] = []
    ) {
        this.transcriptCallback = transcriptCallback;
        this.errorCallback = errorCallback;
        this.interimTranscriptCallback = interimTranscriptCallback;
        this.nextQuestionCallback = nextQuestionCallback;
        this.validChoices = validChoices;
    }

    public setupRecognition(): void {
        if (typeof window !== 'undefined' && 'SpeechRecognition' in window) {
            this.recognition = new window.SpeechRecognition();
        } else if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            this.recognition = new window.webkitSpeechRecognition();
        }

        if (this.recognition) {
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                if (finalTranscript) {
                    this.transcriptCallback(finalTranscript);
                }
                if (interimTranscript) {
                    this.interimTranscriptCallback(interimTranscript);
                }
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.errorCallback(event.error);

                // Handle specific error types
                switch (event.error) {
                    case 'no-speech':
                    case 'audio-capture':
                    case 'network':
                        // These errors are recoverable, try to restart
                        this.reinitializeRecognition();
                        break;
                    case 'aborted':
                        // For aborted errors, wait a bit longer before retrying
                        setTimeout(() => this.reinitializeRecognition(), 1000);
                        break;
                    case 'not-allowed':
                    case 'service-not-allowed':
                        // These errors require user intervention
                        console.error('Speech recognition permission denied');
                        break;
                    default:
                        // For other errors, try to restart after a delay
                        setTimeout(() => this.reinitializeRecognition(), 1000);
                }
            };

            this.recognition.onend = () => {
                console.debug('Speech recognition ended');
                this.isListening = false;
                // Only restart if we're supposed to be listening
                if (this.shouldBeListening) {
                    this.reinitializeRecognition();
                }
            };
        }
    }

    public startListening(): void {
        if (!this.recognition) {
            this.setupRecognition();
        }

        if (this.recognition && !this.isListening) {
            try {
                this.shouldBeListening = true;
                this.recognition.start();
                console.debug('Started listening');
            } catch (error) {
                console.error('Error starting recognition:', error);
                this.errorCallback('Failed to start listening');
            }
        }
    }

    public stopListening(): void {
        if (this.recognition) {
            try {
                this.shouldBeListening = false;
                this.recognition.stop();
                this.isListening = false;
                console.debug('Stopped listening');
            } catch (error) {
                console.error('Error stopping recognition:', error);
            }
        }
    }

    public getListeningState(): boolean {
        return this.isListening;
    }

    public async speak(text: string, options?: VoiceOptions): Promise<void> {
        console.debug('SpeechService.speak() called with:', { text, options });

        // If already playing, queue the text
        if (this.isProcessingQueue) {
            console.debug('Already processing queue, queuing text:', text);
            this.audioQueue.push({ text, options });
            return;
        }

        this.isProcessingQueue = true;
        console.debug('Starting TTS playback for:', text);

        try {
            const response = await fetch('/api/speech', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text, options }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            this.currentAudio = audio;

            // Set up event handlers before playing
            audio.onended = () => {
                console.debug('TTS playback ended');
                this.cleanupAudio(audioUrl);
                this.processQueue();
            };

            audio.onerror = (error) => {
                console.error('TTS playback error:', error);
                this.cleanupAudio(audioUrl);
                this.processQueue();
            };

            // Wait for the audio to finish playing
            await audio.play();
        } catch (error) {
            console.error('TTS error:', error);
            this.cleanupAudio();
            this.processQueue();
        }
    }

    private cleanupAudio(audioUrl?: string) {
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
        this.isProcessingQueue = false;
    }

    private processQueue(): void {
        if (this.audioQueue.length > 0 && !this.isProcessingQueue) {
            const next = this.audioQueue.shift();
            if (next) {
                this.speak(next.text, next.options);
            }
        }
    }

    private reinitializeRecognition() {
        if (!this.recognition) {
            console.debug('Cannot reinitialize: recognition not initialized');
            return;
        }

        try {
            // Add a small delay before restarting to prevent rapid cycles
            setTimeout(() => {
                try {
                    if (this.recognition) {
                        this.recognition.stop();
                        // Add a small delay before starting again
                        setTimeout(() => {
                            try {
                                if (this.recognition) {
                                    this.recognition.start();
                                    console.debug('Recognition restarted after error');
                                }
                            } catch (error) {
                                console.error('Error starting recognition after delay:', error);
                            }
                        }, 500);
                    }
                } catch (error) {
                    console.error('Error stopping recognition:', error);
                }
            }, 500);
        } catch (error) {
            console.error('Error in reinitialization process:', error);
        }
    }

    public isAvailable(): boolean {
        return this.recognition !== null;
    }
} 