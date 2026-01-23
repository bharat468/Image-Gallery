import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaPowerOff,
  FaHome,
  FaImage,
  FaImages,
  FaUsers,
} from "react-icons/fa";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  /* PAGE LOADER */
  useEffect(() => {
    setPageLoading(true);
    const t = setTimeout(() => setPageLoading(false), 250);
    return () => clearTimeout(t);
  }, [location.pathname]);

  /* LOGOUT */
  async function handleLogout() {
    try {
      await instance.post("/admin/logout", {}, { withCredentials: true });
      toast.success("Logged out");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  }

  const menu = [
    { to: "/admin/home", label: "Home", icon: <FaHome /> },
    { to: "/admin/image/upload", label: "Upload", icon: <FaImage /> },
    { to: "/admin/images", label: "Images", icon: <FaImages /> },
    { to: "/admin/users", label: "Users", icon: <FaUsers /> },
  ];

  return (
    /* 🔥 IMAGE-GALLERY STYLE BACKGROUND */
    <div
      className="min-h-screen flex relative"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(99,102,241,0.15), transparent 40%),
          radial-gradient(circle at 80% 10%, rgba(236,72,153,0.15), transparent 40%),
          linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f1f5f9 100%)
        `,
      }}
    >
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md p-2 rounded-xl"
      >
        <FaBars />
      </button>

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static top-0 left-0 z-40 w-64 h-screen
        bg-white border-r border-slate-200
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition-transform duration-300`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-xl font-extrabold text-indigo-600 tracking-tight">
            ImageGallery
          </h2>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-600"
          >
            <FaTimes />
          </button>
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-1">
          {menu.map((item) => {
            const active = location.pathname.startsWith(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl
                text-sm font-medium transition
                ${
                  active
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}

          <hr className="my-4" />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl
            text-red-600 hover:bg-red-50 transition"
          >
            <FaPowerOff />
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* CONTENT CARD */}
        <div
          className="max-w-7xl mx-auto rounded-3xl shadow-sm p-4 sm:p-6 min-h-[80vh]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.97), rgba(255,255,255,0.92))",
            backdropFilter: "blur(8px)",
          }}
        >
          {pageLoading ? (
            <div className="min-h-[60vh] flex items-center justify-center">
              <FaImages className="text-4xl animate-pulse text-slate-400" />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
