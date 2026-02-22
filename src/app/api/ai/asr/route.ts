import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export async function POST(req: NextRequest) {
  try {
    const { audio } = await req.json();

    if (!audio || typeof audio !== "string") {
      return NextResponse.json(
        { error: "Audio data is required" },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    // The audio should be base64 encoded
    const response = await zai.audio.asr.create({
      file_base64: audio,
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("ASR API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}
