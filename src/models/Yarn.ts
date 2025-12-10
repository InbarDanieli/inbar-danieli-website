import { IYarnSchema } from "@/types/yarn.types";
import { Schema, model, models } from "mongoose";

const yarnSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    colorTag: {
      type: String,
    },
    company: {
      type: String,
    },
    materials: {
      type: Object,
    },
    image: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Yarn = model<IYarnSchema>("Yarn", yarnSchema, "yarns", {
  overwriteModels: true,
});

//   id: string;
//   name: string;
//   color: string;
//   colorTag: string;
//   company: string;
//   materials: Record<string, number>; // {cotton: 50%, wool: 50%}
//   image: string;

// Should create new db for this?
// companyToPurchaseFrom: string;
// cost
// PurchaseUrl
