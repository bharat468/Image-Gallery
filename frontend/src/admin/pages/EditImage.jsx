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
    } catch (error) {
      console.log(error);
      toast.error("Failed to update image ❌");
    } finally {
      setBtnLoading(false);
    }
  }

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-100">
        <FaImage className="text-6xl text-slate-600 animate-pulse" />
        <p className="mt-3 text-slate-500">Loading image...</p>
      </div>
    );
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
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Edit Image
        </h2>

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
              className="w-full px-4 py-3 rounded-lg border bg-slate-100"
            />
          </div>

          {/* OLD IMAGE */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Current Image
            </label>
            <img
              src={oldImage}
              alt="Old"
              className="w-full h-56 object-cover rounded-lg border"
            />
          </div>

          {/* NEW IMAGE */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Replace Image (optional)
            </label>
            <input
              type="file"
              ref={imageRef}
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
            <p className="text-xs text-slate-500 mt-1">
              Agar image select nahi karoge to old image hi rahegi
            </p>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={btnLoading}
            className={`w-full py-3 rounded-xl text-white text-lg font-semibold
              bg-gradient-to-r from-slate-900 to-slate-700
              flex items-center justify-center gap-3
              ${btnLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"}
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
