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
        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            this.recognition = new (window as any).webkitSpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.maxAlternatives = 1;

            this.recognition.onstart = () => {
                this.isListening = true;
                console.debug('Speech recognition started');
            };

            this.recognition.onend = () => {
                this.isListening = false;
                console.debug('Speech recognition ended');

                // If we should still be listening, restart after a short delay
                if (this.shouldBeListening) {
                    setTimeout(() => {
                        if (this.recognition && !this.isListening) {
                            try {
                                this.recognition.start();
                                console.debug('Restarted speech recognition after end');
                            } catch (error) {
                                console.error('Error restarting recognition:', error);
                            }
                        }
                    }, 100);
                }
            };

            this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error('Speech recognition error:', event.error);

                // Handle specific error types
                switch (event.error) {
                    case 'no-speech':
                        // This is a common error when no speech is detected
                        console.debug('No speech detected, will retry...');
                        this.errorCallback('No speech detected. Please try speaking again.');
                        // Don't restart immediately for no-speech errors
                        break;

                    case 'audio-capture':
                        this.errorCallback('Could not capture audio. Please check your microphone settings.');
                        this.reinitializeRecognition();
                        break;

                    case 'network':
                        this.errorCallback('Network error occurred. Please check your connection.');
                        this.reinitializeRecognition();
                        break;

                    case 'not-allowed':
                    case 'service-not-allowed':
                        this.errorCallback('Microphone access denied. Please allow microphone access to use this feature.');
                        break;

                    case 'aborted':
                        console.debug('Recognition aborted, will retry...');
                        this.reinitializeRecognition();
                        break;

                    default:
                        console.error('Unknown speech recognition error:', event.error);
                        this.errorCallback('An error occurred. Please try again.');
                        this.reinitializeRecognition();
                }
            };

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
        }
    }

    public startListening(): void {
        if (!this.recognition) {
            console.warn('Speech recognition not initialized');
            return;
        }

        if (this.isListening) {
            console.debug('Speech recognition already running');
            return;
        }

        try {
            this.shouldBeListening = true;
            this.recognition.start();
            console.debug('Started listening');
        } catch (error) {
            console.error('Error starting recognition:', error);
            // If there's an error, try to stop and restart
            try {
                this.recognition.stop();
                setTimeout(() => {
                    this.recognition.start();
                }, 100);
            } catch (retryError) {
                console.error('Failed to restart recognition:', retryError);
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

    private reinitializeRecognition(): void {
        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch (error) {
                console.error('Error stopping recognition:', error);
            }

            // Clear the recognition instance
            this.recognition = null;

            // Wait a moment before reinitializing
            setTimeout(() => {
                this.setupRecognition();
                if (this.recognition && this.shouldBeListening) {
                    try {
                        this.recognition.start();
                    } catch (error) {
                        console.error('Error starting recognition after reinitialization:', error);
                    }
                }
            }, 500);
        }
    }

    public isAvailable(): boolean {
        return this.recognition !== null;
    }
} 