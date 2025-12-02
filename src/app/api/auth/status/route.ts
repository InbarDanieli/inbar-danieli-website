import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    return NextResponse.json({ isAuthenticated: session !== null });
  } catch (error) {
    console.error("Error checking auth status:", error);
    return NextResponse.json({ isAuthenticated: false });
  }
}

