import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../connectDb";
import { Yarn } from "@/models/Yarn";
import { getCurrentUserId } from "@/lib/session";
import {
  paginate,
  emptyPaginationResult,
  getPaginationParams,
} from "@/lib/pagination";
import { PaginateOptions } from "@/types/pagination.types";

// Handle GET requests with pagination
export async function GET(request: NextRequest) {
  try {
    await connectToDb();
    const userId = await getCurrentUserId();
    const options: PaginateOptions = { sort: { createdAt: -1 } };
    const { page, limit, skip } = getPaginationParams(request, options);

    const result = await paginate({
      page,
      limit,
      skip,
      model: Yarn,
      filter: { userId },
      options,
    });

    return NextResponse.json({
      message: "Yarns fetched successfully",
      ...result,
      status: 200,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      message: error,
      ...emptyPaginationResult(),
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
