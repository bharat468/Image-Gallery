import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaHeart, FaInfoCircle, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-slate-300">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h3
            className="text-2xl font-semibold mb-4
              bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600
              bg-clip-text text-transparent"
          >
            ImageGallery
          </h3>
          <p className="text-slate-400 leading-relaxed text-sm">
            Discover, upload and share stunning images.  
            A modern social platform for creativity & inspiration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/liked"
                className="flex items-center gap-2 hover:text-pink-400 transition"
              >
                <FaHeart /> Liked Images
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <FaInfoCircle /> About
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Support
          </h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <FaEnvelope />
              bharatpareek256@gmail.com
            </li>
            <li>Mon – Sat : 10 AM – 7 PM</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} ImageGallery · All Rights Reserved
        </div>
      </div>

    </footer>
  );
}

export default Footer;
