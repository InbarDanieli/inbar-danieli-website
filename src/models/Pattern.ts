import { IPattern } from "@/types/pattern.types";
import { model, Schema } from "mongoose";

const PatternSchema = new Schema(
  {
    title: { type: String, required: true },
    yarns: { type: [String], required: true },
    hookMaxSize: { type: Number, required: true },
    hookMinSize: { type: Number, required: true },
    materials: String,
    tipsAndInfo: String,
    image: { type: String, required: true },
    subtitle: { type: String, required: true },
    abbreviation: Object,
    userId: { type: String, required: true },
    post: {
      type: [
        {
          type: {
            type: String,
            enum: [
              "title",
              "row",
              "images",
              "space",
              "separator",
              "general-note",
            ],
            required: true,
          },
          content: String,
          images: [String],
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in development
export const Pattern = model<IPattern>("Pattern", PatternSchema, "patterns", {
  overwriteModels: true,
});
