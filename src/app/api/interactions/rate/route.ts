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
    const { itemId, itemType, score } = body;

    if (!itemId || !itemType || !score) {
      return NextResponse.json(
        { error: "itemId, itemType, and score are required" },
        { status: 400 }
      );
    }

    const ratingValue = parseInt(score);
    if (ratingValue < 1 || ratingValue > 5) {
      return NextResponse.json(
        { error: "Score must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Check if already rated
    const existingRating = await db.rating.findFirst({
      where: {
        userId: session.id,
        itemId,
        itemType,
      },
    });

    if (existingRating) {
      // Update rating
      const rating = await db.rating.update({
        where: { id: existingRating.id },
        data: { score: ratingValue },
      });
      return NextResponse.json({ rating, success: true });
    } else {
      // Create rating
      const rating = await db.rating.create({
        data: {
          userId: session.id,
          itemId,
          itemType,
          score: ratingValue,
        },
      });
      return NextResponse.json({ rating, success: true });
    }
  } catch (error) {
    console.error("Rating error:", error);
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

    const ratings = await db.rating.findMany({
      where: { itemId, itemType },
      select: { score: true },
    });

    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length
        : 0;

    let userRating = null;
    if (session) {
      const rating = await db.rating.findFirst({
        where: {
          userId: session.id,
          itemId,
          itemType,
        },
      });
      userRating = rating?.score || null;
    }

    return NextResponse.json({
      averageRating: Math.round(averageRating * 10) / 10,
      totalRatings: ratings.length,
      userRating,
    });
  } catch (error) {
    console.error("Get ratings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
