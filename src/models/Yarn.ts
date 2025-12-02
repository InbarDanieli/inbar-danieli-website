import mongoose, { Schema, model, models } from "mongoose";

const yarnSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
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
});

export const Yarn = models.Yarn || model("Yarn", yarnSchema, "yarns");

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
