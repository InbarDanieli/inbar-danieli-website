import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// JWT configuration
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);
const JWT_ISSUER = "inbar-danieli-website";
const JWT_AUDIENCE = "inbar-danieli-website";
const JWT_EXPIRATION = "7d"; // 7 days

// Cookie configuration
const SESSION_COOKIE_NAME = "session_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

// Session data interface
export interface UserSessionData {
  userId: string;
  email: string;
}

// JWT payload with our custom claims
interface SessionJWTPayload extends JWTPayload {
  userId: string;
  email: string;
}

/**
 * Create a new JWT session token
 * @param userId - The user's MongoDB ID
 * @param email - The user's email
 * @returns The generated JWT token
 */
export async function createSession(
  userId: string,
  email: string
): Promise<string> {
  const token = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verify and decode a JWT token
 * @param token - The JWT token to verify
 * @returns User session data or null if invalid/expired
 */
export async function verifyToken(
  token: string
): Promise<UserSessionData | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });

    const sessionPayload = payload as SessionJWTPayload;

    if (!sessionPayload.userId || !sessionPayload.email) {
      return null;
    }

    return {
      userId: sessionPayload.userId,
      email: sessionPayload.email,
    };
  } catch {
    // Token is invalid or expired
    return null;
  }
}

/**
 * Set session cookie in HTTP response
 * @param response - Next.js response object
 * @param token - The JWT token to store in cookie
 * @returns The response with cookie set
 */
export function setSessionCookie(
  response: NextResponse,
  token: string
): NextResponse {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: false, // Allow client-side access for JWT decoding
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "lax", // CSRF protection
    maxAge: COOKIE_MAX_AGE,
    path: "/", // Available on all routes
  });

  return response;
}

/**
 * Clear session cookie from HTTP response
 * @param response - Next.js response object
 * @returns The response with cookie cleared
 */
export function clearSessionCookie(response: NextResponse): NextResponse {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0, // Expire immediately
    path: "/",
  });

  return response;
}

/**
 * Get session from cookies (for server components and API routes)
 * @returns User session data or null if not authenticated
 */
export async function getSession(): Promise<UserSessionData | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  return await verifyToken(sessionCookie.value);
}

/**
 * Check if user is authenticated
 * @returns true if user has valid session, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

/**
 * Get current user ID from session
 * @returns User ID or null if not authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession();
  return session?.userId ?? null;
}

/**
 * Get current user email from session
 * @returns User email or null if not authenticated
 */
export async function getCurrentUserEmail(): Promise<string | null> {
  const session = await getSession();
  return session?.email ?? null;
}
