import { NextRequest } from "next/server";
import { connectToDb } from "../connectDb";
import { Yarn } from "@/models/Yarn";

// Handle GET requests (e.g., fetching a list of users)
export async function GET() {
  try {
    console.log("Getting yarns");

    await connectToDb();

    console.log("Yarns fetched");

    const yarns = await Yarn.find();

    console.log({ yarns });

    return Response.json({
      message: "Yarns fetched successfully",
      data: yarns || [],
      status: 200,
    });
  } catch (error) {
    console.log({ error });
    return Response.json({
      message: error,
      data: [],
      status: 500,
    });
  }
}

// Handle POST requests (e.g., creating a new user)
export async function POST(request: NextRequest) {
  // Get the JSON body from the request
  const body = await request.json();

  console.log({ body });

  const yarn = await Yarn.create(body);

  console.log({ yarn });

  return Response.json({
    message: "Yarn created successfully",
    data: yarn,
    status: 200,
  });
}
