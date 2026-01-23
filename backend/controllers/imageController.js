import Image from "../models/imageModel.js";
import cloudinary from "../middlewares/cloudinary.js";

/* ================= UPLOAD IMAGE ================= */
export async function uploadImage(req, res) {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "gallery",
    });

    const image = await Image.create({
      title,
      imageUrl: result.secure_url,
      publicId: result.public_id, // 🔥 ADDED
      uploadedBy: "admin",
      likes: [],
    });

    return res.status(201).json(image);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/* ================= GET IMAGES ================= */
export async function getImages(req, res) {
  try {
    const { sort } = req.query;
    let images = await Image.find();

    if (sort === "newest") {
      images.sort((a, b) => b.createdAt - a.createdAt);
    }

    if (sort === "oldest") {
      images.sort((a, b) => a.createdAt - b.createdAt);
    }

    if (sort === "popular") {
      images.sort((a, b) => b.likes.length - a.likes.length);
    }

    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/* ================= LIKE / UNLIKE ================= */
export async function likeUnlikeImage(req, res) {
  try {
    const { id } = req.params;
    const userId = String(req.userId);

    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const likes = image.likes.map((uid) => uid.toString());
    const index = likes.indexOf(userId);

    if (index > -1) likes.splice(index, 1);
    else likes.push(userId);

    image.likes = likes;
    await image.save();

    return res.status(200).json({
      _id: image._id,
      title: image.title,
      imageUrl: image.imageUrl,
      likes,
    });
  } catch (err) {
    return res.status(500).json({ message: "Like failed" });
  }
}

/* ================= DELETE IMAGE ================= */
export async function deleteImage(req, res) {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // 🔥 CLOUDINARY DELETE
    await cloudinary.uploader.destroy(image.publicId);

    await image.deleteOne();

    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/* ================= GET SINGLE IMAGE ================= */
export async function getSingleImage(req, res) {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    return res.status(200).json(image);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/* ================= UPDATE IMAGE ================= */
export async function updateImage(req, res) {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    if (title) image.title = title;

    if (req.file) {
      // 🔥 OLD IMAGE DELETE
      await cloudinary.uploader.destroy(image.publicId);

      // 🔥 NEW IMAGE UPLOAD
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "gallery",
      });

      image.imageUrl = result.secure_url;
      image.publicId = result.public_id;
    }

    await image.save();
    return res.status(200).json(image);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
