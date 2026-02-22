import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, code, language = "javascript", mode = "generate" } = body;

    if (!prompt && !code) {
      return NextResponse.json(
        { error: "Prompt or code is required" },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    let systemPrompt = "";
    let userPrompt = "";

    switch (mode) {
      case "generate":
        systemPrompt = `You are an expert programmer. Generate clean, efficient, and well-documented code. 
Always include comments explaining the code. Use best practices for the specified language.
Return only the code with markdown code blocks.`;
        userPrompt = `Generate ${language} code for: ${prompt}`;
        break;
      case "explain":
        systemPrompt = `You are an expert programmer and teacher. Explain code in a clear, easy-to-understand way.
Use markdown formatting for better readability. Include examples if helpful.`;
        userPrompt = `Explain this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``;
        break;
      case "debug":
        systemPrompt = `You are an expert debugger. Analyze code for bugs, errors, and potential issues.
Provide clear explanations of problems and suggest fixes. Use markdown formatting.`;
        userPrompt = `Debug this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\nProblem: ${prompt || "Find and fix any issues"}`;
        break;
      case "improve":
        systemPrompt = `You are an expert code reviewer. Improve code quality, performance, and readability.
Suggest optimizations and best practices. Return the improved code with explanations.`;
        userPrompt = `Improve this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``;
        break;
      default:
        systemPrompt = "You are a helpful coding assistant.";
        userPrompt = prompt || code;
    }

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const responseContent = completion.choices[0]?.message?.content || "I couldn't process your request.";

    return NextResponse.json({
      result: responseContent,
      success: true,
    });
  } catch (error) {
    console.error("Code assistant error:", error);
    return NextResponse.json(
      { error: "Failed to process code request" },
      { status: 500 }
    );
  }
}
