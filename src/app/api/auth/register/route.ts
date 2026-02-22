import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Shared global user store (same as login route)
declare global {
  // eslint-disable-next-line no-var
  var worldia_users: Map<string, { id: string; email: string; name: string; password: string; createdAt: string }>;
}

// Initialize global users store
if (!global.worldia_users) {
  global.worldia_users = new Map();
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (global.worldia_users.has(email.toLowerCase())) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Create new user
    const user = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: email.toLowerCase(),
      name,
      password, // In production, hash this!
      createdAt: new Date().toISOString(),
    };

    global.worldia_users.set(email.toLowerCase(), user);

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
