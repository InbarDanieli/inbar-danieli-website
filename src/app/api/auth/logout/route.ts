import { NextRequest, NextResponse } from "next/server";
import { destroySession, clearSessionCookie } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session_id");

    // If there's a session, destroy it in MongoDB
    if (sessionCookie?.value) {
      await destroySession(sessionCookie.value);
    }

    const response = NextResponse.json({
      message: "User logged out successfully",
      status: 200,
    });

    // Clear the session cookie from browser
    console.log("clearing session cookie");
    return clearSessionCookie(response);
  } catch (error) {
    console.error("Logout error:", error);

    // Even if there's an error, still clear the cookie
    const response = NextResponse.json({
      message: "User logged out successfully",
      status: 200,
    });

    return clearSessionCookie(response);
  }
}
