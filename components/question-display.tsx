"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuestionDisplayProps {
  question: string
  feedback: 'correct' | 'incorrect' | null
  transcript: string
  interimTranscript: string
}

export function QuestionDisplay({
  question,
  feedback,
  transcript,
  interimTranscript
}: QuestionDisplayProps) {
  return (
    <div className="space-y-4">
      {/* Question Area */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">{question}</h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Your answer:</p>
            <div className="min-h-[2rem]">
              {transcript && (
                <p className="text-lg">{transcript}</p>
              )}
              {interimTranscript && (
                <p className="text-lg text-muted-foreground">{interimTranscript}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Area */}
      {feedback && (
        <div className={cn(
          "flex items-center justify-center p-4 rounded-lg",
          feedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        )}>
          {feedback === 'correct' ? (
            <CheckCircle2 className="h-6 w-6 mr-2" />
          ) : (
            <XCircle className="h-6 w-6 mr-2" />
          )}
          <span className="font-medium">
            {feedback === 'correct' ? 'Correct!' : 'Incorrect'}
          </span>
        </div>
      )}
    </div>
  )
}
