import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import instance from "../axiosConfig";
import { toast } from "react-toastify";
import {
  FaHeart,
  FaHome,
  FaInfoCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    try {
      await instance.post("/user/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      toast.success("Logged out successfully 👋");
      navigate("/login");
      setOpen(false);
    } catch {
      toast.error("Logout failed ❌");
    }
  }

  const activeClass =
    "text-white after:block after:h-[2px] after:bg-pink-500 after:mt-1";
  const normalClass = "text-slate-300 hover:text-white transition";

  return (
    <header className="sticky top-0 z-50">
      <div className="relative bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] backdrop-blur-xl border-b border-white/10">

        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between relative">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight
              bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600
              bg-clip-text text-transparent"
          >
            ImageGallery
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? activeClass : normalClass}`
              }
            >
              <FaHome /> Home
            </NavLink>

            <NavLink
              to="/liked"
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? activeClass : normalClass}`
              }
            >
              <FaHeart /> Liked
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive ? activeClass : normalClass}`
              }
            >
              <FaInfoCircle /> About
            </NavLink>

            {!isLoggedIn ? (
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-md
                  bg-gradient-to-r from-pink-500 to-purple-600
                  text-white text-sm font-medium
                  shadow-lg shadow-pink-900/30
                  hover:opacity-90 transition"
              >
                <FaSignInAlt className="inline mr-1" />
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-md
                  bg-slate-900/70 text-white text-sm
                  hover:bg-slate-800 transition"
              >
                <FaSignOutAlt className="inline mr-1" />
                Logout
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-xl"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden px-6 pb-4 space-y-4 bg-black/80 backdrop-blur-lg">

            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "text-white" : "text-slate-300"
                }`
              }
            >
              <FaHome /> Home
            </NavLink>

            <NavLink
              to="/liked"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "text-pink-400" : "text-slate-300"
                }`
              }
            >
              <FaHeart /> Liked
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 ${
                  isActive ? "text-white" : "text-slate-300"
                }`
              }
            >
              <FaInfoCircle /> About
            </NavLink>

            {!isLoggedIn ? (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="inline-block px-4 py-2 rounded-md
                  bg-gradient-to-r from-pink-500 to-purple-600
                  text-white text-sm"
              >
                <FaSignInAlt className="inline mr-1" />
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="block px-4 py-2 rounded-md
                  bg-slate-800 text-white text-sm"
              >
                <FaSignOutAlt className="inline mr-1" />
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
