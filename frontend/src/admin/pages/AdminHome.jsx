import React, { useEffect, useState } from "react";
import {
  FaUpload,
  FaImages,
  FaUserFriends,
  FaCameraRetro,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminHome() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  /* LOADER */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <FaCameraRetro className="text-4xl text-indigo-500 animate-pulse" />
        <p className="mt-3 text-slate-500 text-sm">
          Loading admin panel...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Admin Panel
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your image gallery
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <ActionCard
          title="Upload Image"
          desc="Add a new image to gallery"
          icon={<FaUpload />}
          to="/admin/image/upload"
        />

        <ActionCard
          title="Image List"
          desc="View, edit or delete images"
          icon={<FaImages />}
          to="/admin/images"
        />

        <ActionCard
          title="Users"
          desc="Manage registered users"
          icon={<FaUserFriends />}
          to="/admin/users"
        />

      </div>

      {/* FUTURE SECTION */}
      {/* <div className="mt-12">
        <h2 className="text-lg font-semibold text-slate-700 mb-3">
          Quick Info
        </h2>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-500">
          From here you can upload images, manage gallery content and control users.
        </div>
      </div> */}
    </div>
  );
}

/* CLEAN ACTION CARD */
function ActionCard({ title, desc, icon, to }) {
  return (
    <Link
      to={to}
      className="group bg-white border border-slate-200 rounded-2xl p-6
      shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
    >
      <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600
      flex items-center justify-center text-xl mb-4">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-800">
        {title}
      </h3>

      <p className="text-sm text-slate-500 mt-1">
        {desc}
      </p>
    </Link>
  );
}

export default AdminHome;
