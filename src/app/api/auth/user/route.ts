import { NextResponse } from "next/server";
import { cookies } from "next/headers";

declare global {
  // eslint-disable-next-line no-var
  var worldia_users: Map<string, { id: string; email: string; name: string; password: string; createdAt: string }>;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session")?.value;

    if (!sessionId) {
      return NextResponse.json({ user: null });
    }

    // Find user by session ID
    const users = global.worldia_users || new Map();
    let user = null;

    for (const [_, u] of users) {
      if (u.id === sessionId) {
        user = {
          id: u.id,
          email: u.email,
          name: u.name,
          createdAt: u.createdAt,
        };
        break;
      }
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json({ user: null });
  }
}
