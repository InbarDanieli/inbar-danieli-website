import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  resetToken: string;
  resetTokenExpiration: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    resetToken: String,
    resetTokenExpiration: Date,
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in development
export const User = models.User || model<IUser>("User", UserSchema, "users");
