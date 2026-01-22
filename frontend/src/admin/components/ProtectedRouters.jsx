import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import instance from "../../axiosConfig";
import { FaShoppingBag } from "react-icons/fa";

function ProtectedRouters({ children, referer }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    try {
      const res = await instance.get(
        `/check/login?referer=${referer}`,
        { withCredentials: true }
      );
      setAllowed(res.data.loggedIn === true);
    } catch (error) {
      console.log(error)
      setAllowed(false);
    } finally {
      setLoading(false);
    }
  }

  /* ===== LOADING ===== */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <FaShoppingBag className="text-5xl text-teal-600 animate-bounce" />
      </div>
    );
  }

  /* ===== NOT LOGGED IN ===== */
  if (!allowed) {
    return referer === "admin" ? (
      <Navigate to="/admin/login" replace />
    ) : (
      <Navigate to="/login" replace />
    );
  }

  return children;
}

export default ProtectedRouters;
