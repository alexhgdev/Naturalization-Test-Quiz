"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { Mic, MicOff, Volume2, CheckCircle2, XCircle, Settings, HelpCircle } from "lucide-react"
import { QuestionDisplay } from "@/components/question-display"
import { ResultsSummary } from "@/components/results-summary"
import { Question, naturalizationQuestions } from '@/data/questions'
import { cn } from "@/lib/utils"
import { SpeechService, textToSpeech } from "@/lib/speech-service"

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
  const [currentOptions, setCurrentOptions] = useState<string[]>([])
  const { toast } = useToast()

  const currentQuestion = naturalizationQuestions[currentQuestionIndex]
  const progress = (answeredQuestions.size / naturalizationQuestions.length) * 100

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
      handleInterimTranscript
    )
    setSpeechService(service)

    if (service.isAvailable()) {
      service.toggleListening()
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

  useEffect(() => {
    if (currentQuestion) {
      textToSpeech(currentQuestion.question)
    }
  }, [currentQuestion])

  const handleVoiceCommand = useCallback((command: string) => {
    const normalizedCommand = command.toLowerCase().trim()

    if (normalizedCommand.includes("repeat") || normalizedCommand.includes("say again")) {
      textToSpeech(currentQuestion.question)
    } else if (normalizedCommand.includes("next") || normalizedCommand.includes("skip")) {
      moveToNextQuestion()
    } else if (normalizedCommand.includes("previous") || normalizedCommand.includes("back")) {
      moveToPreviousQuestion()
    } else if (normalizedCommand.includes("stop") || normalizedCommand.includes("quit")) {
      speechService?.stopListening()
        setIsListening(false)
    } else if (!normalizedCommand.includes("repeat") && !normalizedCommand.includes("say again")) {
      checkAnswer(normalizedCommand)
    }
  }, [currentQuestion, speechService])

  const handleAnswerSubmit = (answer: string) => {
    const isCorrect = checkAnswer(answer)
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    setShowFeedback(true)

    if (isCorrect) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => {
          const nextIndex = prev + 1
          if (nextIndex >= naturalizationQuestions.length) {
            setQuizComplete(true)
            return prev
          }
          return nextIndex
        })
        setShowFeedback(false)
        setFeedback(null)
        setTranscript('') // Clear transcript when moving to next question
        setInterimTranscript('') // Clear interim transcript as well
      }, 1500)
    }
  }

  const handleOptionSelect = (selectedAnswer: string) => {
    const isCorrect = checkAnswer(selectedAnswer)
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    setShowFeedback(true)

    if (isCorrect) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => {
          const nextIndex = prev + 1
          if (nextIndex >= naturalizationQuestions.length) {
            setQuizComplete(true)
            return prev
          }
          return nextIndex
        })
        setShowFeedback(false)
        setFeedback(null)
        setTranscript('') // Clear transcript when moving to next question
        setInterimTranscript('') // Clear interim transcript as well
      }, 1500)
    }
  }

  const toggleListening = useCallback(() => {
    if (!speechService?.isAvailable()) {
      toast({
        variant: "destructive",
        title: "Speech Recognition Not Available",
        description: "Your browser doesn't support speech recognition. Please try a different browser.",
      })
      return
    }

    speechService.toggleListening()
    setIsListening(speechService.getListeningState())

    if (speechService.getListeningState()) {
      toast({
        title: "Listening...",
        description: "Speak your answer or say 'repeat' to hear the question again.",
      })
    } else {
      toast({
        title: "Microphone Off",
        description: "Click the microphone to start listening again.",
      })
    }
  }, [speechService, toast])

  // Helper function to normalize text for comparison
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Remove punctuation
      .replace(/\s{2,}/g, ' ') // Replace multiple spaces with single space
      .trim()
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

  // Helper function to calculate similarity percentage with word-level matching
  const calculateSimilarity = (str1: string, str2: string): number => {
    // Normalize both strings
    const normalized1 = normalizeText(str1)
    const normalized2 = normalizeText(str2)

    // Split into words
    const words1 = normalized1.split(' ')
    const words2 = normalized2.split(' ')

    // Calculate word-level similarity
    let wordMatches = 0
    for (const word1 of words1) {
      for (const word2 of words2) {
        const distance = levenshteinDistance(word1, word2)
        const maxLength = Math.max(word1.length, word2.length)
        const similarity = (1 - distance / maxLength) * 100
        if (similarity >= 80) { // Word-level similarity threshold
          wordMatches++
          break
        }
      }
    }

    // Calculate character-level similarity
    const charDistance = levenshteinDistance(normalized1, normalized2)
    const maxLength = Math.max(normalized1.length, normalized2.length)
    const charSimilarity = (1 - charDistance / maxLength) * 100

    // Combine word and character level similarities
    const wordSimilarity = (wordMatches / Math.max(words1.length, words2.length)) * 100
    return (wordSimilarity * 0.6 + charSimilarity * 0.4) // Weighted combination
  }

  const checkAnswer = useCallback((userAnswer: string) => {
    const correctAnswers = Array.isArray(currentQuestion.answer)
      ? currentQuestion.answer.map((a) => a.toLowerCase())
      : [currentQuestion.answer.toLowerCase()]

    // Calculate similarity scores for all correct answers
    const similarityScores = correctAnswers.map(correctAnswer => 
      calculateSimilarity(userAnswer, correctAnswer)
    )

    // Get the highest similarity score
    const maxSimilarity = Math.max(...similarityScores)

    // Consider it correct if similarity is above 65%
    const isCorrect = maxSimilarity >= 65

    // Log the comparison for debugging
    console.log('Answer comparison:', {
      userAnswer,
      correctAnswers,
      similarityScores,
      maxSimilarity,
      isCorrect
    })

    setFeedback(isCorrect ? "correct" : "incorrect")

    if (isCorrect) {
      setScore(score + 1)
      textToSpeech("Correct! Moving to the next question.")
    } else {
      textToSpeech(`Incorrect. The correct answer was: ${Array.isArray(currentQuestion.answer) ? currentQuestion.answer.join(" or ") : currentQuestion.answer}`)
    }

    setTimeout(() => {
      const newAnsweredQuestions = new Set(answeredQuestions)
      newAnsweredQuestions.add(currentQuestionIndex)
      setAnsweredQuestions(newAnsweredQuestions)

      if (newAnsweredQuestions.size === naturalizationQuestions.length) {
        setQuizComplete(true)
        textToSpeech(`Quiz complete! Your score is ${score + 1} out of ${naturalizationQuestions.length}.`)
      } else {
        moveToNextQuestion()
      }
    }, 2000)

    return isCorrect
  }, [currentQuestion, currentQuestionIndex, score, answeredQuestions])

  const moveToNextQuestion = useCallback(() => {
        let nextIndex = (currentQuestionIndex + 1) % naturalizationQuestions.length
    while (answeredQuestions.has(nextIndex)) {
          nextIndex = (nextIndex + 1) % naturalizationQuestions.length
        }
        setCurrentQuestionIndex(nextIndex)
        setFeedback(null)
        setTranscript("")
    setInterimTranscript("")
  }, [currentQuestionIndex, answeredQuestions])

  const moveToPreviousQuestion = useCallback(() => {
    let prevIndex = (currentQuestionIndex - 1 + naturalizationQuestions.length) % naturalizationQuestions.length
    while (answeredQuestions.has(prevIndex)) {
      prevIndex = (prevIndex - 1 + naturalizationQuestions.length) % naturalizationQuestions.length
    }
    setCurrentQuestionIndex(prevIndex)
    setFeedback(null)
    setTranscript("")
    setInterimTranscript("")
  }, [currentQuestionIndex, answeredQuestions])

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0)
    setIsListening(false)
    setTranscript("")
    setInterimTranscript("")
    setFeedback(null)
    setQuizComplete(false)
    setScore(0)
    setAnsweredQuestions(new Set())
    textToSpeech("Quiz has been reset. Good luck!")
  }, [])

  // Generate options when question changes
  useEffect(() => {
    const options = generateOptions(currentQuestion)
    setCurrentOptions(options)
  }, [currentQuestion])

  const generateOptions = (question: Question) => {
    const correctAnswer = Array.isArray(question.answer) 
      ? question.answer[0] 
      : question.answer

    // Get all possible answers for this question
    const allAnswers = Array.isArray(question.answer) 
      ? question.answer 
      : [question.answer]

    // Get all questions in the same category
    const categoryQuestions = naturalizationQuestions.filter(
      q => q.category === question.category
    )

    // Get all possible answers from the same category
    const categoryAnswers = categoryQuestions.flatMap(q => 
      Array.isArray(q.answer) ? q.answer : [q.answer]
    ).filter(a => !allAnswers.includes(a))

    // Get all answers from other categories
    const otherAnswers = naturalizationQuestions
      .filter(q => q.category !== question.category)
      .flatMap(q => Array.isArray(q.answer) ? q.answer : [q.answer])
      .filter(a => !allAnswers.includes(a))

    // Strategy for generating fake answers based on question type
    let fakeAnswers: string[] = []

    if (question.category === "Principles of American Democracy") {
      // For constitutional questions, use similar constitutional concepts
      fakeAnswers = categoryAnswers
        .filter(a => a.toLowerCase().includes('constitution') || 
                    a.toLowerCase().includes('amendment') ||
                    a.toLowerCase().includes('right'))
        .slice(0, 3)
    } else if (question.category === "System of Government") {
      // For government questions, use other government-related answers
      fakeAnswers = categoryAnswers
        .filter(a => a.toLowerCase().includes('government') || 
                    a.toLowerCase().includes('branch') ||
                    a.toLowerCase().includes('president') ||
                    a.toLowerCase().includes('congress'))
        .slice(0, 3)
    } else if (question.category === "Rights and Responsibilities") {
      // For rights questions, use other rights or responsibilities
      fakeAnswers = categoryAnswers
        .filter(a => a.toLowerCase().includes('right') || 
                    a.toLowerCase().includes('responsibility') ||
                    a.toLowerCase().includes('citizen'))
        .slice(0, 3)
    } else if (question.category === "Colonial Period and Independence") {
      // For historical questions, use other historical events or figures
      fakeAnswers = categoryAnswers
        .filter(a => a.toLowerCase().includes('declaration') || 
                    a.toLowerCase().includes('constitution') ||
                    a.toLowerCase().includes('war') ||
                    a.toLowerCase().includes('colony'))
        .slice(0, 3)
    } else if (question.category === "1800s") {
      // For 1800s questions, use other events or figures from that period
      fakeAnswers = categoryAnswers
        .filter(a => a.toLowerCase().includes('war') || 
                    a.toLowerCase().includes('president') ||
                    a.toLowerCase().includes('slavery'))
        .slice(0, 3)
    } else if (question.category === "Recent American History") {
      // For recent history, use other modern events or figures
      fakeAnswers = categoryAnswers
        .filter(a => a.toLowerCase().includes('war') || 
                    a.toLowerCase().includes('president') ||
                    a.toLowerCase().includes('movement'))
        .slice(0, 3)
    } else if (question.category === "Geography") {
      // For geography questions, use other geographical locations
      fakeAnswers = categoryAnswers
        .filter(a => a.toLowerCase().includes('state') || 
                    a.toLowerCase().includes('ocean') ||
                    a.toLowerCase().includes('river') ||
                    a.toLowerCase().includes('territory'))
        .slice(0, 3)
    } else if (question.category === "Symbols") {
      // For symbols questions, use other national symbols
      fakeAnswers = categoryAnswers
        .filter(a => a.toLowerCase().includes('flag') || 
                    a.toLowerCase().includes('anthem') ||
                    a.toLowerCase().includes('symbol'))
        .slice(0, 3)
    } else if (question.category === "Holidays") {
      // For holidays questions, use other holidays
      fakeAnswers = categoryAnswers
        .filter(a => a.toLowerCase().includes('day') || 
                    a.toLowerCase().includes('holiday'))
        .slice(0, 3)
    }

    // If we don't have enough category-specific fake answers, supplement with other answers
    if (fakeAnswers.length < 3) {
      const remainingNeeded = 3 - fakeAnswers.length
      const additionalFakeAnswers = otherAnswers
        .filter(a => !fakeAnswers.includes(a))
        .slice(0, remainingNeeded)
      fakeAnswers = [...fakeAnswers, ...additionalFakeAnswers]
    }

    // If we still don't have enough answers, create some plausible alternatives
    if (fakeAnswers.length < 3) {
      const remainingNeeded = 3 - fakeAnswers.length
      const plausibleAlternatives = generatePlausibleAlternatives(question, fakeAnswers)
      fakeAnswers = [...fakeAnswers, ...plausibleAlternatives.slice(0, remainingNeeded)]
    }

    // Combine correct and fake answers, then shuffle
    const allOptions = [correctAnswer, ...fakeAnswers]
    return shuffleArray(allOptions)
  }

  const generatePlausibleAlternatives = (question: Question, existingAnswers: string[]) => {
    const alternatives: string[] = []
    
    if (question.category === "Principles of American Democracy") {
      if (question.question.includes("Constitution")) {
        if (question.question.includes("supreme law")) {
          alternatives.push(
            "the Declaration of Independence",
            "the Articles of Confederation",
            "the Federalist Papers"
          )
        } else if (question.question.includes("amendment")) {
          alternatives.push(
            "the original Constitution",
            "the Articles of Confederation",
            "the Bill of Rights"
          )
        } else if (question.question.includes("first three words")) {
          alternatives.push(
            "We the Citizens",
            "We the People of the United States",
            "We the Americans"
          )
        }
      } else if (question.question.includes("right") || question.question.includes("freedom")) {
        alternatives.push(
          "the right to bear arms",
          "the right to a fair trial",
          "the right to privacy"
        )
      }
    } else if (question.category === "System of Government") {
      if (question.question.includes("branch")) {
        if (question.question.includes("executive")) {
          alternatives.push(
            "the Supreme Court",
            "the Senate",
            "the House of Representatives"
          )
        } else if (question.question.includes("legislative")) {
          alternatives.push(
            "the President",
            "the Supreme Court",
            "the Cabinet"
          )
        } else if (question.question.includes("judicial")) {
          alternatives.push(
            "Congress",
            "the President",
            "the Cabinet"
          )
        }
      } else if (question.question.includes("President")) {
        if (question.question.includes("Commander in Chief")) {
          alternatives.push(
            "the Secretary of Defense",
            "the Chairman of the Joint Chiefs of Staff",
            "the Secretary of State"
          )
        } else if (question.question.includes("Cabinet")) {
          alternatives.push(
            "the Supreme Court",
            "Congress",
            "the Federal Reserve"
          )
        }
      }
    } else if (question.category === "Rights and Responsibilities") {
      if (question.question.includes("vote")) {
        alternatives.push(
          "serve on a jury",
          "pay taxes",
          "obey the law"
        )
      } else if (question.question.includes("citizen")) {
        alternatives.push(
          "vote in state elections",
          "own property",
          "travel freely"
        )
      }
    } else if (question.category === "Colonial Period and Independence") {
      if (question.question.includes("Declaration")) {
        alternatives.push(
          "the Constitution",
          "the Articles of Confederation",
          "the Federalist Papers"
        )
      } else if (question.question.includes("colonists")) {
        alternatives.push(
          "because of religious persecution",
          "because of economic opportunity",
          "because of political freedom"
        )
      }
    } else if (question.category === "1800s") {
      if (question.question.includes("Civil War")) {
        alternatives.push(
          "the Revolutionary War",
          "the War of 1812",
          "the Spanish-American War"
        )
      } else if (question.question.includes("Lincoln")) {
        alternatives.push(
          "George Washington",
          "Thomas Jefferson",
          "Andrew Jackson"
        )
      }
    } else if (question.category === "Recent American History") {
      if (question.question.includes("World War")) {
        alternatives.push(
          "the Korean War",
          "the Vietnam War",
          "the Gulf War"
        )
      } else if (question.question.includes("movement")) {
        alternatives.push(
          "the Women's Suffrage Movement",
          "the Labor Movement",
          "the Environmental Movement"
        )
      }
    } else if (question.category === "Geography") {
      if (question.question.includes("ocean")) {
        alternatives.push(
          "the Indian Ocean",
          "the Arctic Ocean",
          "the Southern Ocean"
        )
      } else if (question.question.includes("state")) {
        if (question.question.includes("Canada")) {
          alternatives.push(
            "California",
            "Texas",
            "Florida"
          )
        } else if (question.question.includes("Mexico")) {
          alternatives.push(
            "Alaska",
            "Hawaii",
            "Maine"
          )
        }
      } else if (question.question.includes("capital")) {
        alternatives.push(
          "New York City",
          "Los Angeles",
          "Chicago"
        )
      }
    } else if (question.category === "Symbols") {
      if (question.question.includes("flag")) {
        if (question.question.includes("stripes")) {
          alternatives.push(
            "because there are 50 states",
            "because it represents the original 13 colonies",
            "because it represents the original 13 states"
          )
        } else if (question.question.includes("stars")) {
          alternatives.push(
            "because there were 13 original colonies",
            "because it represents the 50 states",
            "because it represents the 50 territories"
          )
        }
      }
    } else if (question.category === "Holidays") {
      if (question.question.includes("Independence Day")) {
        alternatives.push(
          "July 1",
          "July 2",
          "July 3"
        )
      } else if (question.question.includes("national holidays")) {
        alternatives.push(
          "Labor Day",
          "Memorial Day",
          "Veterans Day"
        )
      }
    }

    // Filter out any alternatives that are already in the existing answers
    return alternatives.filter(a => !existingAnswers.includes(a))
  }

  const shuffleArray = (array: string[]) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  if (quizComplete) {
    return <ResultsSummary score={score} totalQuestions={naturalizationQuestions.length} onReset={resetQuiz} />
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
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => textToSpeech(currentQuestion.question)}
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
                      <li>"Stop" - Stop listening</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <CardDescription>
            Speak your answers or use voice commands to navigate
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
              options={currentOptions}
              onOptionSelect={handleOptionSelect}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={toggleListening}
                    size="lg"
                    variant={isListening ? "destructive" : "default"}
                    className={cn(
                      "h-16 w-16 rounded-full flex items-center justify-center transition-all",
                    isListening && "animate-pulse"
                    )}
                  >
                    {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                <p>{isListening ? "Click to stop listening" : "Click to start listening"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        </CardFooter>
      </Card>
    </div>
  )
}
