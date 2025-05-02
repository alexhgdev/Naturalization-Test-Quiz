"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { Mic, MicOff, Volume2, CheckCircle2, XCircle, Settings, HelpCircle, RotateCcw, Shuffle } from "lucide-react"
import { QuestionDisplay } from "@/components/question-display"
import { ResultsSummary } from "@/components/results-summary"
import { Question, naturalizationQuestions } from '@/data/questions'
import { cn } from "@/lib/utils"
import { SpeechService, textToSpeech, VoiceOptions } from "@/lib/speech-service"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MicButton } from "@/components/mic-button"

export function QuizContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isListening, setIsListening] = useState(true)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [quizComplete, setQuizComplete] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [speechService, setSpeechService] = useState<SpeechService | null>(null)
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(naturalizationQuestions)
  const [voiceSettings, setVoiceSettings] = useState<VoiceOptions>({
    voice: "alloy",
    speed: 1.0,
    pitch: 1.0
  })
  const { toast } = useToast()
  const spokenQuestionsRef = useRef<Set<number>>(new Set())

  const currentQuestion = shuffledQuestions[currentQuestionIndex]
  const progress = (answeredQuestions.size / shuffledQuestions.length) * 100

  // Helper function to calculate similarity between strings
  const calculateSimilarity = (str1: string, str2: string): number => {
    const normalized1 = str1.toLowerCase().trim()
    const normalized2 = str2.toLowerCase().trim()
    const maxLength = Math.max(normalized1.length, normalized2.length)
    const distance = levenshteinDistance(normalized1, normalized2)
    return (1 - distance / maxLength) * 100
  }

  // Helper function to calculate Levenshtein distance
  const levenshteinDistance = (str1: string, str2: string): number => {
    const m = str1.length
    const n = str2.length
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))

    for (let i = 0; i <= m; i++) dp[i][0] = i
    for (let j = 0; j <= n; j++) dp[0][j] = j

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1]
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j - 1] + 1, // substitution
            dp[i - 1][j] + 1,     // deletion
            dp[i][j - 1] + 1      // insertion
          )
        }
      }
    }

    return dp[m][n]
  }

  const moveToNextQuestion = useCallback(() => {
    let nextIndex = (currentQuestionIndex + 1) % shuffledQuestions.length
    while (answeredQuestions.has(nextIndex)) {
      nextIndex = (nextIndex + 1) % shuffledQuestions.length
    }
    setCurrentQuestionIndex(nextIndex)
    setFeedback(null)
    setTranscript("")
    setInterimTranscript("")
  }, [currentQuestionIndex, answeredQuestions, shuffledQuestions.length])

  const moveToPreviousQuestion = useCallback(() => {
    let prevIndex = (currentQuestionIndex - 1 + shuffledQuestions.length) % shuffledQuestions.length
    while (answeredQuestions.has(prevIndex)) {
      prevIndex = (prevIndex - 1 + shuffledQuestions.length) % shuffledQuestions.length
    }
    setCurrentQuestionIndex(prevIndex)
    setFeedback(null)
    setTranscript("")
    setInterimTranscript("")
  }, [currentQuestionIndex, answeredQuestions, shuffledQuestions.length])

  const checkAnswer = useCallback((userAnswer: string) => {
    const normalizedCommand = userAnswer.toLowerCase().trim()

    if (normalizedCommand === "next") {
      moveToNextQuestion()
      return
    }

    if (normalizedCommand === "repeat") {
      if (speechService) {
        speechService.speak(currentQuestion.question, voiceSettings)
        // After reading the question, read all correct answers
        const correctAnswers = Array.isArray(currentQuestion.answer)
          ? currentQuestion.answer.join(" or ")
          : currentQuestion.answer
        speechService.speak(`The correct answer is: ${correctAnswers}`, voiceSettings)
        speechService.speak("Say 'next' to move to the next question, or 'repeat' to hear this question and answers again.", voiceSettings)
      }
      return
    }

    const correctAnswers = Array.isArray(currentQuestion.answer)
      ? currentQuestion.answer.map((a: string) => a.toLowerCase())
      : [currentQuestion.answer.toLowerCase()]

    const similarityScores = correctAnswers.map((correctAnswer: string) => 
      calculateSimilarity(normalizedCommand, correctAnswer)
    )

    const maxSimilarity = Math.max(...similarityScores)
    const isCorrect = maxSimilarity >= 65

    if (isCorrect) {
      setScore(score + 1)
      if (speechService) {
        speechService.speak("Correct!", voiceSettings)
        // Read all correct answers
        const correctAnswersText = Array.isArray(currentQuestion.answer)
          ? currentQuestion.answer.join(" or ")
          : currentQuestion.answer
        speechService.speak(`The correct answer is: ${correctAnswersText}`, voiceSettings)
        speechService.speak("Say 'next' to move to the next question, or 'repeat' to hear this question and answers again.", voiceSettings)
      }
    } else {
      if (speechService) {
        speechService.speak("Incorrect.", voiceSettings)
        // Read all correct answers
        const correctAnswersText = Array.isArray(currentQuestion.answer)
          ? currentQuestion.answer.join(" or ")
          : currentQuestion.answer
        speechService.speak(`The correct answer is: ${correctAnswersText}`, voiceSettings)
        speechService.speak("Say 'next' to move to the next question, or 'repeat' to hear this question and answers again.", voiceSettings)
      }
    }

    setFeedback(isCorrect ? "correct" : "incorrect")
    setShowFeedback(true)

    if (isCorrect) {
      const newAnsweredQuestions = new Set(answeredQuestions)
      newAnsweredQuestions.add(currentQuestionIndex)
      setAnsweredQuestions(newAnsweredQuestions)

      if (newAnsweredQuestions.size === shuffledQuestions.length) {
        setQuizComplete(true)
        if (speechService) {
          speechService.speak(`Quiz complete! Your score is ${score + 1} out of ${shuffledQuestions.length}.`, voiceSettings)
        }
      }
    }
  }, [currentQuestion, currentQuestionIndex, score, answeredQuestions, voiceSettings, speechService, moveToNextQuestion, shuffledQuestions.length])

  const handleVoiceCommand = useCallback((command: string) => {
    const normalizedCommand = command.toLowerCase().trim()

    if (normalizedCommand.includes("repeat") || normalizedCommand.includes("say again")) {
      if (speechService) {
        speechService.speak(currentQuestion.question, voiceSettings)
        // After reading the question, read all correct answers
        const correctAnswers = Array.isArray(currentQuestion.answer)
          ? currentQuestion.answer.join(" or ")
          : currentQuestion.answer
        speechService.speak(`The correct answer is: ${correctAnswers}`, voiceSettings)
        speechService.speak("Say 'next' to move to the next question, or 'repeat' to hear this question and answers again.", voiceSettings)
      }
    } else if (normalizedCommand.includes("next") || normalizedCommand.includes("skip")) {
      moveToNextQuestion()
    } else if (normalizedCommand.includes("previous") || normalizedCommand.includes("back")) {
      moveToPreviousQuestion()
    } else {
      checkAnswer(normalizedCommand)
    }
  }, [currentQuestion, speechService, voiceSettings, moveToNextQuestion, moveToPreviousQuestion, checkAnswer])

  const handleTranscript = useCallback((text: string) => {
    setTranscript(text)
    handleVoiceCommand(text)
  }, [currentQuestionIndex])

  const handleInterimTranscript = useCallback((text: string) => {
    setInterimTranscript(text)
  }, [])

  const handleError = useCallback((error: string) => {
    toast({
      variant: "destructive",
      title: "Speech Recognition Error",
      description: error,
    })
  }, [toast])

  useEffect(() => {
    const service = new SpeechService(
      handleTranscript,
      handleError,
      handleInterimTranscript,
      () => {}, // nextQuestionCallback
      [] // validChoices
    )
    setSpeechService(service)

    // Initialize speech recognition
    service.setupRecognition()

    if (service.isAvailable()) {
      service.startListening()
      setIsListening(true)
      toast({
        title: "Listening...",
        description: "Speak your answer or say 'repeat' to hear the question again.",
      })
    }

    return () => {
      service.stopListening()
    }
  }, [handleTranscript, handleError, handleInterimTranscript, toast])

  // Single useEffect to handle both initial mount and question changes
  useEffect(() => {
    if (speechService && currentQuestion && !spokenQuestionsRef.current.has(currentQuestionIndex)) {
      console.debug('Speaking question:', currentQuestion.question)
      speechService.speak(currentQuestion.question, voiceSettings)
      spokenQuestionsRef.current.add(currentQuestionIndex)
    }
  }, [currentQuestion, speechService, voiceSettings, currentQuestionIndex])

  const handleAnswerSubmit = (answer: string) => {
    const isCorrect = checkAnswer(answer)
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    setShowFeedback(true)

    if (isCorrect) {
      if (speechService) {
        speechService.speak("Correct! Moving to the next question.", voiceSettings).then(() => {
          setTimeout(() => {
            setCurrentQuestionIndex(prev => {
              const nextIndex = prev + 1
              if (nextIndex >= shuffledQuestions.length) {
                setQuizComplete(true)
                return prev
              }
              return nextIndex
            })
            setShowFeedback(false)
            setFeedback(null)
            setTranscript('') // Clear transcript when moving to next question
            setInterimTranscript('') // Clear interim transcript as well
          }, 500) // Reduced delay since we're already waiting for audio to finish
        })
      } else {
        // If no speech service, just move to next question after a delay
        setTimeout(() => {
          setCurrentQuestionIndex(prev => {
            const nextIndex = prev + 1
            if (nextIndex >= shuffledQuestions.length) {
              setQuizComplete(true)
              return prev
            }
            return nextIndex
          })
          setShowFeedback(false)
          setFeedback(null)
          setTranscript('')
          setInterimTranscript('')
        }, 1500)
      }
    }
  }

  const shuffleQuestions = useCallback(() => {
    const newShuffled = [...naturalizationQuestions]
    for (let i = newShuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newShuffled[i], newShuffled[j]] = [newShuffled[j], newShuffled[i]]
    }
    setShuffledQuestions(newShuffled)
    setCurrentQuestionIndex(0)
    setAnsweredQuestions(new Set())
    setScore(0)
    setQuizComplete(false)
    
    // Restart speech recognition
    if (speechService) {
      speechService.stopListening()
      speechService.startListening()
    }

    // Read the first question
    if (newShuffled[0] && speechService) {
      speechService.speak(newShuffled[0].question, voiceSettings)
    }

    toast({
      title: "Questions Shuffled",
      description: "Starting with a new random order...",
    })
  }, [speechService, toast, voiceSettings])

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0)
    setIsListening(true)
    setFeedback(null)
    setShowFeedback(false)
    setTranscript('')
    setInterimTranscript('')
    setQuizComplete(false)
    setScore(0)
    setAnsweredQuestions(new Set())
    setShuffledQuestions(naturalizationQuestions)
    spokenQuestionsRef.current.clear()
    
    if (speechService) {
      speechService.startListening()
      speechService.speak(naturalizationQuestions[0].question, voiceSettings)
      spokenQuestionsRef.current.add(0)
    }

    toast({
      title: "Quiz Reset",
      description: "Starting from the beginning...",
    })
  }, [speechService, toast, voiceSettings])

  if (quizComplete) {
    return <ResultsSummary score={score} totalQuestions={shuffledQuestions.length} onReset={resetQuiz} />
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">U.S. Naturalization Quiz</CardTitle>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Quiz Settings</SheetTitle>
                    <SheetDescription>
                      Configure your quiz experience
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Voice Settings</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Voice</label>
                          <Select
                            value={voiceSettings.voice}
                            onValueChange={(value) => setVoiceSettings(prev => ({ ...prev, voice: value as VoiceOptions["voice"] }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select voice" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="alloy">Alloy</SelectItem>
                              <SelectItem value="echo">Echo</SelectItem>
                              <SelectItem value="fable">Fable</SelectItem>
                              <SelectItem value="onyx">Onyx</SelectItem>
                              <SelectItem value="nova">Nova</SelectItem>
                              <SelectItem value="shimmer">Shimmer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Speed</label>
                          <Slider
                            min={0.5}
                            max={2}
                            step={0.1}
                            value={[voiceSettings.speed || 1.0]}
                            onValueChange={([value]) => setVoiceSettings(prev => ({ ...prev, speed: value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">Pitch</label>
                          <Slider
                            min={0.5}
                            max={2}
                            step={0.1}
                            value={[voiceSettings.pitch || 1.0]}
                            onValueChange={([value]) => setVoiceSettings(prev => ({ ...prev, pitch: value }))}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (speechService) {
                            speechService.speak(currentQuestion.question, voiceSettings)
                          }
                        }}
                      >
                        <Volume2 className="h-4 w-4 mr-2" />
                        Repeat Question
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voice Commands:</p>
                    <ul className="list-disc pl-4 mt-2">
                      <li>"Repeat" - Hear the question again</li>
                      <li>"Next" - Skip to next question</li>
                      <li>"Previous" - Go back to previous question</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={shuffleQuestions}
                    >
                      <Shuffle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Shuffle Questions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={resetQuiz}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset Quiz</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <CardDescription>
            Speak your answers or use voice commands to navigate. For the best experience, we recommend using headphones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            <QuestionDisplay
              question={currentQuestion.question}
              feedback={feedback}
              transcript={transcript}
              interimTranscript={interimTranscript}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          {speechService && (
            <MicButton
              speechService={speechService}
              isListening={isListening}
              onListeningChange={setIsListening}
            />
          )}
          <Button
            variant="outline"
            onClick={() => {
              moveToNextQuestion()
              if (speechService) {
                speechService.speak(shuffledQuestions[currentQuestionIndex].question, voiceSettings)
              }
            }}
          >
            Next Question
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
