import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { FaHeart, FaRegHeart, FaImage } from "react-icons/fa";
import { toast } from "react-toastify";

function ImageFeed() {
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  async function loadFeed() {
    try {
      const auth = await instance.get("/check/login?referer=user", {
        withCredentials: true,
      });

      if (auth.data.loggedIn) {
        setUserId(String(auth.data.userId));
      }

      const res = await instance.get("/image/feed");

      const safeImages = shuffleArray(
        res.data.map((img) => ({
          ...img,
          likes: Array.isArray(img.likes) ? img.likes.map(String) : [],
        }))
      );

      setImages(safeImages);
    } catch {
      toast.error("Failed to load images ❌");
    } finally {
      setLoading(false);
    }
  }

  async function toggleLike(imageId) {
    if (!userId) {
      toast.info("Please login to like ❤️");
      return;
    }

    try {
      const res = await instance.post(
        `/image/like/${imageId}`,
        {},
        { withCredentials: true }
      );

      const updatedLikes = (res.data.likes || []).map(String);

      setImages((prev) =>
        prev.map((img) =>
          img._id === imageId ? { ...img, likes: updatedLikes } : img
        )
      );
    } catch {
      toast.error("Like / Unlike failed ❌");
    }
  }

  /* ================= DOUBLE TAP HANDLER ================= */
  function handleDoubleTap(img) {
    if (!userId) {
      toast.info("Please login to like ❤️");
      return;
    }

    const alreadyLiked = img.likes.includes(userId);

    if (!alreadyLiked) {
      toggleLike(img._id);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <FaImage className="text-6xl text-slate-400 animate-pulse" />
        <p className="mt-3 text-slate-500">Loading images...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
        Image Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => {
          const liked = userId && img.likes.includes(userId);

          return (
            <div
              key={img._id}
              className="rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="relative">
                {/* IMAGE WITH DOUBLE TAP */}
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-64 object-cover select-none"
                  onDoubleClick={() => handleDoubleTap(img)}
                />

                {/* OVERLAY */}
                <div
                  className="absolute bottom-0 left-0 right-0
                  bg-gradient-to-t from-black/60 to-transparent
                  px-4 py-3 text-white"
                >
                  <h3 className="text-sm font-medium truncate">
                    {img.title}
                  </h3>

                  <button
                    onClick={() => toggleLike(img._id)}
                    className="mt-1 flex items-center gap-2 text-sm"
                  >
                    {liked ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart />
                    )}
                    <span>{img.likes.length}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ImageFeed;
