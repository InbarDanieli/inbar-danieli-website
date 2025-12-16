import { getCurrentUserInfo } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentUserInfo();
    return NextResponse.json({
      message: "User fetched successfully",
      data: user,
      status: 200,
    });
  } catch (error) {
    console.error("User fetch error:", error);
    return NextResponse.json({
      message: "An error occurred during user fetch",
      status: 500,
    });
  }
}
