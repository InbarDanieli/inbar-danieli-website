import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/session";

export async function POST() {
  try {
    const response = NextResponse.json({
      message: "User logged out successfully",
      status: 200,
    });

    // Clear the JWT cookie from browser
    // Note: JWT is stateless, so we just need to remove the cookie
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
