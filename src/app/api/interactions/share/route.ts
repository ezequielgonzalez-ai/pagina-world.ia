import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { itemId, itemType, platform } = body;

    if (!itemId || !itemType || !platform) {
      return NextResponse.json(
        { error: "itemId, itemType, and platform are required" },
        { status: 400 }
      );
    }

    // In a real app, you would track shares in the database
    // For now, we'll just return success
    return NextResponse.json({ success: true, platform });
  } catch (error) {
    console.error("Share error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("itemId");
    const itemType = searchParams.get("itemType");

    if (!itemId || !itemType) {
      return NextResponse.json(
        { error: "itemId and itemType are required" },
        { status: 400 }
      );
    }

    // Return share count (mock for now)
    return NextResponse.json({ count: 0 });
  } catch (error) {
    console.error("Get shares error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
