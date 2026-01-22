import React, { useRef, useState } from "react";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";
import { FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function UploadImage() {
  const imageRef = useRef(null);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= IMAGE CHANGE ================= */
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      imageRef.current.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be under 2MB");
      imageRef.current.value = "";
      return;
    }

    setImage(file);
  }

  /* ================= SUBMIT ================= */
  async function handleSubmit(e) {
    e.preventDefault();

    if (title.trim().length < 3 || !image) {
      toast.warning("Title & image are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      setLoading(true);

      await instance.post("/image/upload", formData, {
        withCredentials: true,
      });

      toast.success("Image uploaded successfully 🎉");

      setTitle("");
      setImage(null);
      if (imageRef.current) imageRef.current.value = "";
    } catch (error) {
      console.log(error)
      toast.error("Image upload failed ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
      >
        <FaArrowLeft />
        <span className="text-sm">Back</span>
      </button>

      {/* CARD */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Upload New Image
        </h2>
        <p className="text-slate-500 mb-6">
          Add images to your gallery (JPG, PNG, max 2MB)
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Image Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
              className="w-full px-4 py-3 rounded-lg border bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-800"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Select Image
            </label>
            <input
              type="file"
              ref={imageRef}
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white text-lg font-semibold
              bg-gradient-to-r from-slate-900 to-slate-700
              flex items-center justify-center gap-3 transition
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"}
            `}
          >
            <FaCloudUploadAlt className="text-xl" />
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadImage;
