import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

console.log(pathname);


  // Match any route starting with /crochet (except /crochet/dashboard)
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
