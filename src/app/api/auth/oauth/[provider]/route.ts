import { NextRequest, NextResponse } from "next/server";
import { createSession, setSessionCookie, getUserByEmail, createUser } from "@/lib/auth";

// OAuth configuration - would typically come from environment variables
const OAUTH_CONFIGS: Record<string, { clientId: string; clientSecret: string; authUrl: string; tokenUrl: string; userInfoUrl: string }> = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    userInfoUrl: "https://www.googleapis.com/oauth2/v2/userinfo",
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID || "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    authUrl: "https://github.com/login/oauth/authorize",
    tokenUrl: "https://github.com/login/oauth/access_token",
    userInfoUrl: "https://api.github.com/user",
  },
  twitter: {
    clientId: process.env.TWITTER_CLIENT_ID || "",
    clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
    authUrl: "https://twitter.com/i/oauth2/authorize",
    tokenUrl: "https://api.twitter.com/2/oauth2/token",
    userInfoUrl: "https://api.twitter.com/2/users/me",
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  const config = OAUTH_CONFIGS[provider];

  if (!config) {
    return NextResponse.json(
      { error: "Invalid OAuth provider" },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  // If no code, redirect to OAuth provider
  if (!code) {
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/oauth/${provider}`;
    const authUrl = new URL(config.authUrl);
    
    authUrl.searchParams.set("client_id", config.clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", provider === "google" ? "email profile" : provider === "github" ? "user:email" : "tweet.read users.read");
    
    if (state) {
      authUrl.searchParams.set("state", state);
    }
    
    return NextResponse.redirect(authUrl.toString());
  }

  // Exchange code for token
  try {
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/oauth/${provider}`;
    
    const tokenResponse = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }).toString(),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to get access token");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get user info from OAuth provider
    const userResponse = await fetch(config.userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to get user info");
    }

    const userData = await userResponse.json();
    
    // Extract email and name based on provider
    let email: string;
    let name: string;
    let image: string | undefined;

    if (provider === "google") {
      email = userData.email;
      name = userData.name;
      image = userData.picture;
    } else if (provider === "github") {
      email = userData.email || `${userData.id}@github.com`;
      name = userData.name || userData.login;
      image = userData.avatar_url;
    } else {
      email = userData.data?.email || `${userData.data?.id}@twitter.com`;
      name = userData.data?.name || userData.data?.username;
      image = userData.data?.profile_image_url;
    }

    // Check if user exists, create if not
    let user = await getUserByEmail(email);
    
    if (!user) {
      user = await createUser({
        email,
        name,
        image,
      });
    }

    // Create session
    const sessionToken = await createSession(user.id);
    await setSessionCookie(sessionToken);

    // Redirect to home page
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("OAuth error:", error);
    return NextResponse.redirect(new URL("/?auth=error", request.url));
  }
}
