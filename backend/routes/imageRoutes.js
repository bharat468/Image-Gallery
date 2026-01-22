import { Router } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

import {
  uploadImage,
  getImages,
  likeUnlikeImage,
  deleteImage,
  getSingleImage,
  updateImage,
} from "../controllers/imageController.js";

import { checkAuth } from "../middlewares/middlewaresAuth.js";

/* ===== ENSURE UPLOADS FOLDER ===== */
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

/* ===== MULTER CONFIG ===== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files allowed"), false);
    } else {
      cb(null, true);
    }
  },
});

const imageRouter = Router();

/* ===== ROUTES ===== */

// upload image
imageRouter.post("/upload", upload.single("image"), uploadImage);

// image feed
imageRouter.get("/feed", getImages);

// single image
imageRouter.get("/:id", getSingleImage);

// update image
imageRouter.put("/:id", upload.single("image"), updateImage);

// like / unlike (user login required)
imageRouter.post("/like/:id", checkAuth, likeUnlikeImage);

// delete image
imageRouter.delete("/:id", deleteImage);

export default imageRouter;
