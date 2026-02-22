import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";
import os from "os";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const SUPPORTED_SIZES = [
  "1024x1024",
  "768x1344",
  "864x1152",
  "1344x768",
  "1152x864",
  "1440x720",
  "720x1440",
];

// Write config file if it doesn't exist
function ensureConfig() {
  const configContent = JSON.stringify({
    baseUrl: process.env.Z_AI_BASE_URL || "http://172.25.136.193:8080/v1",
    apiKey: process.env.Z_AI_API_KEY || "Z.ai",
  });

  // Try multiple locations
  const locations = [
    path.join(process.cwd(), ".z-ai-config"),
    path.join(os.homedir(), ".z-ai-config"),
    "/etc/.z-ai-config",
  ];

  for (const loc of locations) {
    try {
      if (!fs.existsSync(loc)) {
        fs.writeFileSync(loc, configContent, "utf8");
        console.log("[API] Created config at:", loc);
      }
    } catch (e) {
      console.log("[API] Could not create config at:", loc, e);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    // Ensure config exists
    ensureConfig();

    const body = await req.json();
    const { prompt, size = "1024x1024" } = body;

    console.log("[API] Request received:", { prompt: prompt?.substring?.(0, 50), size });

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (!SUPPORTED_SIZES.includes(size)) {
      return NextResponse.json(
        { success: false, error: `Invalid size. Use: ${SUPPORTED_SIZES.join(", ")}` },
        { status: 400 }
      );
    }

    // Create SDK instance
    console.log("[API] Creating ZAI instance...");
    const zai = await ZAI.create();
    console.log("[API] ZAI instance created");

    // Generate image
    console.log("[API] Calling image generation...");
    
    const result = await zai.images.generations.create({
      prompt: prompt.trim(),
      size: size as "1024x1024",
    });

    console.log("[API] Generation complete");

    const base64 = result?.data?.[0]?.base64;

    if (!base64) {
      console.error("[API] No base64 in response");
      return NextResponse.json(
        { success: false, error: "Image generation returned empty result" },
        { status: 500 }
      );
    }

    console.log("[API] Success! Image length:", base64.length);

    return NextResponse.json({
      success: true,
      image: base64,
      prompt: prompt.trim(),
      size,
    });

  } catch (error: unknown) {
    console.error("[API] Error:", error);
    
    let message = "Failed to generate image";
    
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
