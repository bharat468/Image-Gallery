import React, { useEffect, useState } from "react";
import {
  FaUpload,
  FaImages,
  FaUserFriends,
  FaArrowRight,
  FaCameraRetro,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminHome() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-slate-100">
        <div className="relative">
          <FaCameraRetro className="text-5xl text-teal-600 animate-bounce" />
          <div className="absolute -inset-4 border-2 border-dashed border-teal-500 rounded-full animate-spin"></div>
        </div>
        <p className="ml-3 text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">

      {/* HEADER */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-1 text-lg">
          Manage images, uploads & users
        </p>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <Card
          title="Upload Image"
          desc="Upload new images to gallery"
          color="from-teal-500 to-teal-700"
          icon={<FaUpload size={24} />}
          to="/admin/image/upload"
        />

        <Card
          title="Image List"
          desc="View & manage uploaded images"
          color="from-blue-500 to-blue-700"
          icon={<FaImages size={24} />}
          to="/admin/images"
        />

        <Card
          title="Users"
          desc="View registered users"
          color="from-rose-500 to-red-600"
          icon={<FaUserFriends size={24} />}
          to="/admin/users"
        />

      </div>
    </div>
  );
}

/* 🔥 REUSABLE CARD */
function Card({ title, desc, color, icon, to }) {
  return (
    <div className="bg-white shadow-md border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`h-14 w-14 rounded-xl text-white flex items-center justify-center bg-gradient-to-br ${color}`}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
          <p className="text-slate-500 text-sm">{desc}</p>
        </div>
      </div>

      <Link
        to={to}
        className={`inline-flex items-center px-5 py-2.5 text-white font-semibold rounded-lg bg-gradient-to-r ${color} hover:opacity-90 transition gap-2`}
      >
        Go <FaArrowRight />
      </Link>
    </div>
  );
}

export default AdminHome;
