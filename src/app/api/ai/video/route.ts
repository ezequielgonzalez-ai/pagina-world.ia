import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export async function POST(req: NextRequest) {
  try {
    const { prompt, image_url, quality = "speed", duration = 5, fps = 30, size } = await req.json();

    if (!prompt && !image_url) {
      return NextResponse.json(
        { error: "Either prompt or image_url is required" },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    // Create video generation task
    const task = await zai.video.generations.create({
      prompt,
      image_url,
      quality,
      duration,
      fps,
      size,
    });

    return NextResponse.json({
      success: true,
      taskId: task.id,
      status: task.task_status,
    });
  } catch (error) {
    console.error("Video generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create video task" },
      { status: 500 }
    );
  }
}

// Query task status
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return NextResponse.json(
        { error: "taskId is required" },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();
    const result = await zai.async.result.query(taskId);

    const response: Record<string, unknown> = {
      taskId,
      status: result.task_status,
    };

    if (result.task_status === "SUCCESS") {
      const videoUrl =
        (result as Record<string, unknown>).video_result &&
        Array.isArray((result as Record<string, unknown>).video_result) &&
        ((result as Record<string, unknown>).video_result as Array<Record<string, unknown>>)[0]?.url;

      if (videoUrl) {
        response.videoUrl = videoUrl;
      }
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Video status query error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to query task status" },
      { status: 500 }
    );
  }
}
