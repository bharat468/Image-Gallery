import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { FaHeart, FaImage } from "react-icons/fa";
import { toast } from "react-toastify";

function Liked() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      const authRes = await instance.get("/check/login?referer=user", {
        withCredentials: true,
      });

      if (!authRes.data.loggedIn) {
        toast.warning("Please login to view liked images ❤️");
        setLoading(false);
        return;
      }

      const uid = String(authRes.data.userId);
      setUserId(uid);

      const res = await instance.get("/image/feed");

      const likedImages = res.data
        .map((img) => ({
          ...img,
          likes: Array.isArray(img.likes) ? img.likes.map(String) : [],
        }))
        .filter((img) => img.likes.includes(uid));

      setImages(likedImages);
    } catch {
      toast.error("Failed to load liked images");
    } finally {
      setLoading(false);
    }
  }

  async function toggleUnlike(imageId) {
    try {
      await instance.post(
        `/image/like/${imageId}`,
        {},
        { withCredentials: true }
      );
      setImages((prev) => prev.filter((img) => img._id !== imageId));
      toast.success("Removed from liked ❤️");
    } catch {
      toast.error("Unlike failed ❌");
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <FaImage className="text-6xl text-slate-400 animate-pulse" />
        <p className="mt-2 text-slate-500">Loading liked images...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
        ❤️ Liked Images
      </h1>

      {images.length === 0 ? (
        <p className="text-center text-slate-500">
          You have not liked any images yet
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {img.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {img.likes.length} likes
                  </p>
                </div>

                <button
                  onClick={() => toggleUnlike(img._id)}
                  className="text-red-600 hover:scale-110 transition"
                >
                  <FaHeart />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Liked;
