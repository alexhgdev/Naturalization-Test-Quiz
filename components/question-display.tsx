"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuestionDisplayProps {
  question: string
  feedback: "correct" | "incorrect" | null
  transcript: string
  interimTranscript: string | null
  options: string[]
  onOptionSelect: (option: string) => void
}

export function QuestionDisplay({
  question,
  feedback,
  transcript,
  interimTranscript,
  options,
  onOptionSelect,
}: QuestionDisplayProps) {
  return (
    <div className="min-h-[500px] flex flex-col gap-4">
      {/* Question Area */}
      <div className="min-h-[80px] flex items-center justify-center p-4 bg-muted/50 rounded-lg">
        <p className="text-lg font-medium text-center">{question}</p>
      </div>

      {/* Options Area */}
      <div className="flex-1 min-h-[200px] overflow-y-auto space-y-2 p-2">
        {options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full h-auto min-h-[60px] py-3 px-4 text-left justify-start whitespace-normal"
            onClick={() => onOptionSelect(option)}
          >
            <span className="text-base">{option}</span>
          </Button>
        ))}
      </div>

      {/* Transcript Display */}
      <div className="min-h-[80px] p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">Listening...</span>
        </div>
        <div className="relative min-h-[24px]">
          {transcript ? (
            <p className={cn(
              "text-lg transition-all duration-300",
              "animate-in fade-in slide-in-from-bottom-2"
            )}>
              {transcript}
            </p>
          ) : interimTranscript ? (
            <p className={cn(
              "text-lg text-muted-foreground",
              "transition-all duration-300",
              "animate-in fade-in slide-in-from-bottom-2"
            )}>
              {interimTranscript}
            </p>
          ) : (
            <p className="text-lg text-muted-foreground opacity-50">
              Speak your answer...
            </p>
          )}
        </div>
      </div>

      {/* Feedback Area */}
      <div className={cn(
        "min-h-[60px] flex items-center justify-center p-4 rounded-lg transition-all duration-300",
        feedback === "correct" && "bg-green-500/10 text-green-500",
        feedback === "incorrect" && "bg-red-500/10 text-red-500",
        !feedback && "opacity-0"
      )}>
        {feedback === "correct" && (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span>Correct!</span>
          </div>
        )}
        {feedback === "incorrect" && (
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            <span>Incorrect</span>
          </div>
        )}
      </div>
    </div>
  )
}
