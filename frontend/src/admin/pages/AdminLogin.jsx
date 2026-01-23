import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEyeSlash,
  FaCameraRetro,
  FaHome,
  FaGlobe,
} from "react-icons/fa";

function AdminLogin() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.warning("Please enter email & password");
      return;
    }

    try {
      setLoading(true);

      await instance.post("/admin/login", data, {
        withCredentials: true,
      });

      toast.success("Admin login successful 🔐");
      navigate("/admin/home");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid admin credentials ❌"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    /* 🌈 GALLERY STYLE BACKGROUND */
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(99,102,241,0.15), transparent 40%),
          radial-gradient(circle at 80% 10%, rgba(236,72,153,0.15), transparent 40%),
          linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f1f5f9 100%)
        `,
      }}
    >
      {/* 🔝 TOP LINKS */}
      <div className="absolute top-4 right-4 flex gap-2">
        {/* <Link
          to="/"
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl
          shadow text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          <FaGlobe />
          Main Website
        </Link> */}

        <Link
          to="/"
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl
          shadow text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          <FaHome />
          Home
        </Link>
      </div>

      {/* 🔐 LOGIN CARD */}
      <div
        className="w-full max-w-md rounded-3xl shadow-lg p-8 border border-slate-200"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.97), rgba(255,255,255,0.92))",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="h-14 w-14 rounded-2xl bg-indigo-50 text-indigo-600
            flex items-center justify-center text-2xl">
              <FaCameraRetro />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-800">
            Admin Login
          </h2>
          <p className="text-slate-500 mt-1">
            Secure access to image gallery
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-xl border border-slate-300
              bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300
                bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2
                text-slate-500 hover:text-slate-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white text-lg font-semibold
              bg-indigo-600 hover:bg-indigo-700 transition
              flex items-center justify-center gap-3
              ${loading ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
