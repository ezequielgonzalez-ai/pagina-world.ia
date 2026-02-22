import { cookies } from "next/headers";
import { db } from "./db";
import { hash, compare } from "bcryptjs";

const SESSION_COOKIE_NAME = "worldia_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function createSession(userId: string): Promise<string> {
  const sessionToken = generateSessionToken();
  const expires = new Date(Date.now() + SESSION_DURATION * 1000);
  
  await db.session.create({
    data: {
      sessionToken,
      userId,
      expires,
    },
  });
  
  return sessionToken;
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (!sessionToken) return null;
  
  const session = await db.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  });
  
  if (!session || session.expires < new Date()) {
    if (session) {
      await db.session.delete({ where: { sessionToken } });
    }
    return null;
  }
  
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
    role: session.user.role,
  };
}

export async function setSessionCookie(sessionToken: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (sessionToken) {
    await db.session.deleteMany({ where: { sessionToken } });
  }
  
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getUserByEmail(email: string) {
  return db.user.findUnique({ where: { email } });
}

export async function createUser(data: {
  email: string;
  name?: string;
  password?: string;
  image?: string;
}) {
  return db.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: data.password,
      image: data.image,
    },
  });
}

export async function updateUser(userId: string, data: { name?: string; image?: string }) {
  return db.user.update({
    where: { id: userId },
    data,
  });
}

function generateSessionToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
