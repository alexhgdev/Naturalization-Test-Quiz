import { NextResponse } from "next/server"
import OpenAI from "openai"

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

        const { text } = await req.json()

        if (!text) {
            return NextResponse.json(
                { error: "Text is required" },
                { status: 400 }
            )
        }

        const response = await openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: text,
        })

        const audioBuffer = await response.arrayBuffer()
        const audioBase64 = Buffer.from(audioBuffer).toString("base64")

        return NextResponse.json({ audio: audioBase64 })
    } catch (error) {
        console.error("Error generating speech:", error)
        return NextResponse.json(
            { error: "Failed to generate speech" },
            { status: 500 }
        )
    }
} 