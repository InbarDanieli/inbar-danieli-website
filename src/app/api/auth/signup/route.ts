import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../connectDb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { createSession, setSessionCookie } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, confirmPassword } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required", status: 400 },
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({
        message: "Password must be at least 6 characters long",
        status: 400,
      });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({
        message: "Passwords do not match",
        status: 400,
      });
    }

    await connectToDb();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists", status: 409 },
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    // Create session in MongoDB for automatic login
    const userId = String(newUser._id);
    const sessionId = await createSession(userId, newUser.email);

    // Create response
    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: { id: userId, email: newUser.email },
        status: 200,
      },
      { status: 201 }
    );

    // Set HTTP-only cookie with the session ID
    return setSessionCookie(response, sessionId);
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "An error occurred during signup", status: 500 },
    );
  }
}
