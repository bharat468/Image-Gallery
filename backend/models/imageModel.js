import { Schema, model } from "mongoose";

const imageSchema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true }, // 🔥
  uploadedBy: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "auth" }],
  createdAt: { type: Date, default: Date.now },
});


const Image = model("Image", imageSchema);
export default Image;
