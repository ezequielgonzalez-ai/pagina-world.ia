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
    const { itemId, itemType, content, rating } = body;

    if (!itemId || !itemType || !content) {
      return NextResponse.json(
        { error: "itemId, itemType, and content are required" },
        { status: 400 }
      );
    }

    const comment = await db.comment.create({
      data: {
        userId: session.id,
        itemId,
        itemType,
        content,
        rating: rating ? parseInt(rating) : null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ comment, success: true });
  } catch (error) {
    console.error("Comment error:", error);
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

    const comments = await db.comment.findMany({
      where: { itemId, itemType },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Get comments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
