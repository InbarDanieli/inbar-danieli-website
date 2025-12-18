import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../connectDb";
import { Yarn } from "@/models/Yarn";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ yarnId: string }> }
) {
  console.log("DELETE request received");
  try {
    await connectToDb();
    const { yarnId } = await params;
    const yarn = await Yarn.findByIdAndDelete(yarnId);

    if (!yarn) {
      return NextResponse.json({
        message: "Yarn not found",
        data: [],
        status: 404,
      });
    }
    return NextResponse.json({
      message: "Yarn deleted successfully",
      data: yarn,
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ yarnId: string }> }
) {
  console.log("GET request received");
  try {
    await connectToDb();
    const { yarnId } = await params;
    const yarn = await Yarn.findById(yarnId);
    return NextResponse.json({
      message: "Yarn fetched successfully",
      data: yarn,
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ yarnId: string }> }
) {
  console.log("PUT request received");
  try {
    await connectToDb();
    const { yarnId } = await params;
    const body = await request.json();
    const yarn = await Yarn.findByIdAndUpdate(yarnId, body, { new: true });

    return NextResponse.json({
      message: "Yarn updated successfully",
      data: yarn,
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
