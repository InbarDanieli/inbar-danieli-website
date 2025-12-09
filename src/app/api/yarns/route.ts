import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../connectDb";
import { Yarn } from "@/models/Yarn";
import { getCurrentUserId } from "@/lib/session";

// Handle GET requests (e.g., fetching a list of users)
export async function GET() {
  try {
    await connectToDb();
    const userId = await getCurrentUserId();

    // console.log("Yarns fetched for", userId);

    const yarns = await Yarn.find({ userId });

    console.log({ yarns });

    return NextResponse.json({
      message: "Yarns fetched successfully",
      data: yarns || [],
      status: 200,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      message: error,
      data: [],
      status: 500,
    });
  }
}

// Handle POST requests (e.g., creating a new user)
export async function POST(request: NextRequest) {
  try {
    await connectToDb();

    // Get the JSON body from the request
    const body = await request.json();

    const yarn = await Yarn.create(body);

    return NextResponse.json({
      message: "Yarn created successfully",
      data: yarn,
      status: 200,
    });
  } catch (error) {
    console.dir(error, { depth: null });
    return NextResponse.json({
      message: error,
      data: [],
      status: 500,
    });
  }
}
