import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    // Build messages array with history
    const messages = [
      {
        role: "assistant" as const,
        content: `Eres el asistente de WORLD.IA, una plataforma completa de herramientas de IA. 
Tu objetivo es ayudar a los usuarios a:
- Encontrar las mejores herramientas de IA para sus necesidades
- Responder preguntas sobre IA y tecnología
- Ayudar con prompts y uso de herramientas de IA
- Proporcionar información sobre las últimas tendencias en IA

Responde de manera amigable, concisa y útil. Si no sabes algo, admítelo honestamente.
Puedes responder en español o inglés según el idioma del usuario.`,
      },
      ...history.map((h: { role: string; content: string }) => ({
        role: h.role as "user" | "assistant",
        content: h.content,
      })),
      { role: "user" as const, content: message },
    ];

    const completion = await zai.chat.completions.create({
      messages,
      thinking: { type: "disabled" },
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("Empty response from AI");
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process chat" },
      { status: 500 }
    );
  }
}
