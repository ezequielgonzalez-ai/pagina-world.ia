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

    // Check if already favorited
    const existingFavorite = await db.favorite.findFirst({
      where: {
        userId: session.id,
        itemId,
        itemType,
      },
    });

    if (existingFavorite) {
      // Remove favorite
      await db.favorite.delete({
        where: { id: existingFavorite.id },
      });
      return NextResponse.json({ favorited: false, success: true });
    } else {
      // Add favorite
      await db.favorite.create({
        data: {
          userId: session.id,
          itemId,
          itemType,
        },
      });
      return NextResponse.json({ favorited: true, success: true });
    }
  } catch (error) {
    console.error("Favorite error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("itemId");
    const itemType = searchParams.get("itemType");

    if (!itemId || !itemType) {
      return NextResponse.json(
        { error: "itemId and itemType are required" },
        { status: 400 }
      );
    }

    const count = await db.favorite.count({
      where: { itemId, itemType },
    });

    let isFavorited = false;
    if (session) {
      const favorite = await db.favorite.findFirst({
        where: {
          userId: session.id,
          itemId,
          itemType,
        },
      });
      isFavorited = !!favorite;
    }

    return NextResponse.json({ count, isFavorited });
  } catch (error) {
    console.error("Get favorites error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
