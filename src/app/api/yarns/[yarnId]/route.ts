import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../connectDb";
import { Yarn } from "@/models/Yarn";
import { deleteImage } from "@/lib/cloudinary";

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

    // Delete associated image from Cloudinary
    if (yarn.image?.imageId) {
      try {
        await deleteImage(yarn.image.imageId);
      } catch (imageError) {
        console.error("Failed to delete image from Cloudinary:", imageError);
        // Continue with yarn deletion even if image deletion fails
      }
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

    // Get existing yarn to check if image is being replaced
    const existingYarn = await Yarn.findById(yarnId);

    // If there's an existing image and we're replacing it with a new one or the image is being removed, delete the old image
    if (
      existingYarn?.image?.imageId &&
      (body.image?.imageId === null ||
        existingYarn.image.imageId !== body.image?.imageId)
    ) {
      try {
        await deleteImage(existingYarn?.image?.imageId || "");
      } catch (imageError) {
        console.error(
          "Failed to delete old image from Cloudinary:",
          imageError
        );
        // Continue with update even if old image deletion fails
      }
    }

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
