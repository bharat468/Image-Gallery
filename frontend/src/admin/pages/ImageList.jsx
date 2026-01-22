import React, { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import {
  FaTrash,
  FaPlus,
  FaArrowLeft,
  FaImage,
  FaEdit,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* 📅 DATE FORMATTER */
function formatDate(dateString) {
  if (!dateString) return "—";
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

function ImageList() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const res = await instance.get("/image/feed");
      setImages(res.data);
    } catch {
      toast.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  }

  async function deleteImage(id) {
    try {
      setDeletingId(id);
      await instance.delete(`/image/${id}`, { withCredentials: true });
      setImages(prev => prev.filter(img => img._id !== id));
      toast.success("Image deleted successfully");
    } catch {
      toast.error("Failed to delete image");
    } finally {
      setDeletingId("");
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <FaImage className="text-6xl text-slate-700 animate-pulse" />
        <p className="mt-3 text-slate-600">Loading images...</p>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900"
      >
        <FaArrowLeft />
        <span className="text-sm">Back</span>
      </button>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Uploaded Images
        </h2>

        <Link
          to="/admin/image/upload"
          className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900"
        >
          <FaPlus /> Upload Image
        </Link>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map(img => (
          <div
            key={img._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-slate-800">
                  {img.title}
                </h3>

                <p className="text-xs text-slate-500">
                  ❤️ {img.likes?.length || 0} likes
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Uploaded: {formatDate(img.createdAt)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  to={`/admin/image/edit/${img._id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </Link>

                <button
                  onClick={() => deleteImage(img._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  {deletingId === img._id ? (
                    <FaImage className="animate-pulse" />
                  ) : (
                    <FaTrash />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ImageList;
