import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";
import { FaArrowLeft, FaSave, FaImage } from "react-icons/fa";

function EditImage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  /* ================= FETCH IMAGE ================= */
  useEffect(() => {
    async function fetchImage() {
      try {
        const res = await instance.get(`/image/${id}`, {
          withCredentials: true,
        });

        setTitle(res.data.title);
        setOldImage(res.data.imageUrl);
      } catch {
        toast.error("Failed to load image");
        navigate("/admin/images");
      } finally {
        setLoading(false);
      }
    }

    fetchImage();
  }, [id, navigate]);

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
      toast.error("Image must be under 2MB");
      imageRef.current.value = "";
      return;
    }

    setNewImage(file);
  }

  /* ================= UPDATE ================= */
  async function handleSubmit(e) {
    e.preventDefault();

    if (title.trim().length < 3) {
      toast.warning("Title must be at least 3 characters");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (newImage) formData.append("image", newImage);

    try {
      setBtnLoading(true);

      await instance.put(`/image/${id}`, formData, {
        withCredentials: true,
      });

      toast.success("Image updated successfully 🎉");
      navigate("/admin/images");
    } catch {
      toast.error("Failed to update image ❌");
    } finally {
      setBtnLoading(false);
    }
  }

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <FaImage className="text-5xl text-indigo-500 animate-pulse" />
        <p className="mt-3 text-slate-500 text-sm">
          Loading image...
        </p>
      </div>
    );
  }

  return (
    /* 🌈 SAME GALLERY BACKGROUND FAMILY */
    <div
      className="min-h-screen p-4 sm:p-6"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(99,102,241,0.12), transparent 40%),
          radial-gradient(circle at 80% 10%, rgba(236,72,153,0.12), transparent 40%),
          linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f1f5f9 100%)
        `,
      }}
    >
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-slate-600
        hover:text-slate-900 font-medium"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* CARD */}
      <div
        className="max-w-2xl mx-auto rounded-3xl shadow-md p-6 sm:p-8 border border-slate-200"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.97), rgba(255,255,255,0.92))",
          backdropFilter: "blur(8px)",
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
          Edit Image
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Image Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300
              bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* OLD IMAGE */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Current Image
            </label>
            <img
              src={oldImage}
              alt="Current"
              className="w-full h-56 object-cover rounded-xl border"
            />
          </div>

          {/* NEW IMAGE */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Replace Image (optional)
            </label>
            <input
              type="file"
              ref={imageRef}
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-xl bg-white"
            />
            <p className="text-xs text-slate-500 mt-1">
              Max size: 2MB. Leave empty to keep current image.
            </p>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={btnLoading}
            className={`w-full py-3 rounded-xl text-white text-lg font-semibold
              bg-indigo-600 hover:bg-indigo-700 transition
              flex items-center justify-center gap-3
              ${btnLoading ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            <FaSave />
            {btnLoading ? "Updating..." : "Update Image"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditImage;
