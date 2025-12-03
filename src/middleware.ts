import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const isPublicRoute =
    pathname === "/crochet/login" ||
    pathname === "/crochet/signup" ||
    !pathname.startsWith("/crochet");

  // Check if session cookie exists (lightweight check for Edge runtime)
  const sessionCookie = request.cookies.get("session_token");
  const hasSessionCookie = !!sessionCookie?.value;

  // If trying to access protected route without session cookie, redirect to login
  if (!isPublicRoute && !hasSessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/crochet/login";
    return NextResponse.redirect(url);
  }

  // If has session cookie and trying to access login/signup, redirect to dashboard
  if (
    hasSessionCookie &&
    (pathname === "/crochet/login" || pathname === "/crochet/signup")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/crochet/dashboard";
    return NextResponse.redirect(url);
  }

  // Handle /crochet redirect to dashboard
  if (pathname === "/crochet" || pathname === "/crochet/") {
    const url = request.nextUrl.clone();
    url.pathname = "/crochet/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/crochet/:path*"],
};
