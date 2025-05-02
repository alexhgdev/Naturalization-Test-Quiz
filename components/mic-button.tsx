"use client"

import { Button } from "@/components/ui/button"
import { Mic2, MicOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { SpeechService } from "@/lib/speech-service"

interface MicButtonProps {
  speechService: SpeechService
  isListening: boolean
  onListeningChange: (isListening: boolean) => void
}

export function MicButton({ speechService, isListening, onListeningChange }: MicButtonProps) {
  const handleClick = () => {
    console.debug('MicButton clicked', { isListening })
    
    if (isListening) {
      speechService.stopListening()
      console.debug('stopListening called', { isListening: speechService.getListeningState() })
    } else {
      speechService.startListening()
      console.debug('startListening called', { isListening: speechService.getListeningState() })
    }
    
    onListeningChange(!isListening)
  }

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "h-16 w-16 rounded-full flex items-center justify-center transition-all",
        isListening ? "bg-red-500 hover:bg-red-600" : "bg-gray-200 hover:bg-gray-300"
      )}
    >
      {isListening ? (
        <Mic2 className="h-6 w-6 text-white" />
      ) : (
        <MicOff className="h-6 w-6 text-gray-700" />
      )}
    </Button>
  )
} 