import { Schema, model } from "mongoose";

const imageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  uploadedBy: {
    type: String,
    required: true,
  },

  // ✅ FIXED
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "auth", // Auth model
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = model("Image", imageSchema);
export default Image;
