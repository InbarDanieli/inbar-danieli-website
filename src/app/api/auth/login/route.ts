import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../connectDb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { createSession, setSessionCookie } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log({ email, password });

    if (!email || !password) {
      return NextResponse.json({
        message: "Email and password are required",
        status: 400,
      });
    }

    await connectToDb();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "Invalid email or password",
        status: 401,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({
        message: "Invalid email or password",
        status: 401,
      });
    }

    const userId = String(user._id);
    const sessionId = await createSession(userId, user.email);

    const response = NextResponse.json({
      message: "User logged in successfully",
      user: {
        id: userId,
        email: user.email,
      },
      status: 200,
    });

    // Set HTTP-only cookie with the session ID
    return setSessionCookie(response, sessionId);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login", status: 500 },
    );
  }
}
