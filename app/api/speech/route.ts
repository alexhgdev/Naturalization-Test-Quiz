import { NextResponse } from "next/server"
import OpenAI from "openai"
import { VoiceOptions } from "@/lib/speech-service"

// Check if we're in a build environment
const isBuild = process.env.NEXT_PHASE === "phase-production-build"

export async function POST(req: Request) {
    if (isBuild) {
        // Return a mock response during build
        return NextResponse.json({
            success: true,
            message: "Mock response during build"
        })
    }

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        })

        const { text, options } = await req.json()

        if (!text) {
            return NextResponse.json(
                { error: "Text is required" },
                { status: 400 }
            )
        }

        const voiceOptions: VoiceOptions = options || { voice: "alloy" }

        const response = await openai.audio.speech.create({
            model: "tts-1",
            voice: voiceOptions.voice,
            input: text,
            speed: voiceOptions.speed || 1.0,
        })

        const audioBuffer = await response.arrayBuffer()

        // Return the audio as a binary stream
        return new NextResponse(audioBuffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': audioBuffer.byteLength.toString(),
            },
        })
    } catch (error) {
        console.error("Error generating speech:", error)
        return NextResponse.json(
            { error: "Failed to generate speech" },
            { status: 500 }
        )
    }
} 