"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy } from "lucide-react"

interface ResultsSummaryProps {
  score: number
  totalQuestions: number
  onReset: () => void
}

export function ResultsSummary({ score, totalQuestions, onReset }: ResultsSummaryProps) {
  const percentage = (score / totalQuestions) * 100
  const isPerfect = score === totalQuestions

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl flex items-center gap-2">
            {isPerfect ? (
              <React.Fragment>
                <Trophy className="h-6 w-6 text-yellow-500" />
                Perfect Score!
              </React.Fragment>
            ) : (
              "Quiz Complete"
            )}
          </CardTitle>
          <CardDescription>Here's how you did on the naturalization quiz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Score</span>
              <span className="text-sm font-medium">
                {score}/{totalQuestions} ({percentage.toFixed(1)}%)
              </span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Performance Summary</h3>
            <p className="text-sm text-muted-foreground">
              {isPerfect
                ? "Congratulations! You got every question correct. You're well prepared for the naturalization test!"
                : percentage >= 80
                ? "Great job! You're well on your way to passing the naturalization test."
                : "Keep practicing! Review the questions you missed and try again."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onReset}>
            Try Again
          </Button>
          <Button variant="default" onClick={onReset}>
            Start New Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
