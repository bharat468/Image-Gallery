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

  /* PAGE LOADER ON ROUTE CHANGE */
  useEffect(() => {
    setPageLoading(true);
    const t = setTimeout(() => setPageLoading(false), 300);
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
    { to: "/admin/home", label: "Dashboard", icon: <FaHome /> },
    { to: "/admin/image/upload", label: "Upload Image", icon: <FaImage /> },
    { to: "/admin/images", label: "Image List", icon: <FaImages /> },
    // { to: "/admin/users", label: "Users", icon: <FaUsers /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-800 p-2 rounded"
      >
        <FaBars />
      </button>

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static top-0 left-0 z-40 w-64 h-screen
        bg-gradient-to-b from-slate-900 to-slate-800
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition-transform duration-300`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <FaTimes />
          </button>
        </div>

        {/* MENU */}
        <nav className="p-3 space-y-1">
          {menu.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg
                transition
                ${
                  active
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:bg-slate-700"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}

          <hr className="my-4 border-slate-700" />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2
            rounded-lg bg-red-600 hover:bg-red-700"
          >
            <FaPowerOff /> Logout
          </button>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-4 lg:p-6 bg-slate-100 text-slate-800">
        {pageLoading ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <FaImages className="text-5xl animate-pulse text-slate-500" />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}

export default AdminLayout;
