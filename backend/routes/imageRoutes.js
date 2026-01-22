// import { Router } from "express";
// import fs from "fs";
// import multer from "multer";
// import path from "path";

// import {
//   uploadImage,
//   getImages,
//   likeUnlikeImage,
//   deleteImage,
//   getSingleImage,
//   updateImage,
// } from "../controllers/imageController.js";

// import { checkAuth } from "../middlewares/middlewaresAuth.js";

// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads"),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
//   fileFilter(req, file, cb) {
//     if (!file.mimetype.startsWith("image/")) {
//       cb(new Error("Only image files allowed"), false);
//     } else {
//       cb(null, true);
//     }
//   },
// });


// imageRouter.post("/upload", upload.single("image"), uploadImage);

// imageRouter.get("/feed", getImages);

// imageRouter.get("/:id", getSingleImage);

// imageRouter.put("/:id", upload.single("image"), updateImage);

// imageRouter.post("/like/:id", checkAuth, likeUnlikeImage);

// imageRouter.delete("/:id", deleteImage);

// export default imageRouter;

// import { Router } from "express";
// import fs from "fs";
// import multer from "multer";
// import path from "path";

import {
  uploadImage,
  getImages,
  likeUnlikeImage,
  deleteImage,
  getSingleImage,
  updateImage,
} from "../controllers/imageController.js";

import { checkAuth } from "../middlewares/middlewaresAuth.js";

const imageRouter = Router();   // ✅ THIS WAS MISSING

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

imageRouter.post("/upload", upload.single("image"), uploadImage);
imageRouter.get("/feed", getImages);
imageRouter.get("/:id", getSingleImage);
imageRouter.put("/:id", upload.single("image"), updateImage);
imageRouter.post("/like/:id", checkAuth, likeUnlikeImage);
imageRouter.delete("/:id", deleteImage);

export default imageRouter;

