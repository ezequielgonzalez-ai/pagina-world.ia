import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { itemId, itemType } = body;

    if (!itemId || !itemType) {
      return NextResponse.json(
        { error: "itemId and itemType are required" },
        { status: 400 }
      );
    }

    // Check if already liked
    const existingLike = await db.like.findFirst({
      where: {
        userId: session.id,
        itemId,
        itemType,
      },
    });

    if (existingLike) {
      // Unlike
      await db.like.delete({
        where: { id: existingLike.id },
      });
      return NextResponse.json({ liked: false, success: true });
    } else {
      // Like
      await db.like.create({
        data: {
          userId: session.id,
          itemId,
          itemType,
        },
      });
      return NextResponse.json({ liked: true, success: true });
    }
  } catch (error) {
    console.error("Like error:", error);
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

    const session = await getSession();

    const count = await db.like.count({
      where: { itemId, itemType },
    });

    let isLiked = false;
    if (session) {
      const like = await db.like.findFirst({
        where: {
          userId: session.id,
          itemId,
          itemType,
        },
      });
      isLiked = !!like;
    }

    return NextResponse.json({ count, isLiked });
  } catch (error) {
    console.error("Get likes error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
