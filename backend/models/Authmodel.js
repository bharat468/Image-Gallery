import { Schema, model } from "mongoose";

const authSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String }, // empty for google users
    googleId: { type: String },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    blocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("Auth", authSchema);
