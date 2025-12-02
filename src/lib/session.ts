import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import {
  getSessionFromStore,
  setSessionInStore,
  destroySessionInStore,
  UserSessionData,
} from "./sessionStore";

// Cookie configuration
const SESSION_COOKIE_NAME = "session_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

/**
 * Create a new session in MongoDB and return the session ID
 * @param userId - The user's MongoDB ID
 * @param email - The user's email
 * @returns The generated session ID
 */
export async function createSession(
  userId: string,
  email: string
): Promise<string> {
  // Generate a cryptographically secure random session ID
  const sessionId = randomUUID();

  // Create session data
  const sessionData: UserSessionData = {
    userId,
    email,
  };

  // Store in MongoDB
  await setSessionInStore(sessionId, sessionData);

  return sessionId;
}

/**
 * Get session data from MongoDB by session ID
 * @param sessionId - The session ID
 * @returns User session data or null if not found/expired
 */
export async function getSessionById(
  sessionId: string
): Promise<UserSessionData | null> {
  return await getSessionFromStore(sessionId);
}

/**
 * Destroy a session (delete from MongoDB)
 * @param sessionId - The session ID to destroy
 */
export async function destroySession(sessionId: string): Promise<void> {
  await destroySessionInStore(sessionId);
}

/**
 * Set session cookie in HTTP response
 * @param response - Next.js response object
 * @param sessionId - The session ID to store in cookie
 * @returns The response with cookie set
 */
export function setSessionCookie(
  response: NextResponse,
  sessionId: string
): NextResponse {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: sessionId,
    httpOnly: true, // Prevents JavaScript access (XSS protection)
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
    httpOnly: true,
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

  // Get session data from MongoDB
  return await getSessionById(sessionCookie.value);
}

/**
 * Get session from request (for middleware)
 * @param request - Next.js request object
 * @returns User session data or null if not authenticated
 */
export async function getSessionFromRequest(
  request: NextRequest
): Promise<UserSessionData | null> {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  // Get session data from MongoDB
  return await getSessionById(sessionCookie.value);
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

