import instance from "../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  /* ================= NORMAL LOGIN ================= */
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await instance.post("/user/login", data);
      const { token, user } = res.data;

      // 🔐 Store token & user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setIsLoggedIn(true);

      toast.success("Login successful 🎉"); // ✅ SUCCESS TOAST
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  }

  /* ================= GOOGLE LOGIN ================= */
  async function handleGoogleSuccess(res) {
    try {
      setLoading(true);

      const response = await instance.post("/user/google-login", {
        token: res.credential,
      });

      const { token, user } = response.data;

      // 🔐 Store token & user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setIsLoggedIn(true);

      toast.success("Google login successful 🎉"); // ✅ SUCCESS TOAST
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Google login failed ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-center text-3xl font-bold text-slate-800">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border bg-slate-100"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 pr-12 rounded-lg border bg-slate-100"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-4 text-slate-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-slate-900 text-white font-semibold
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <Link to="/register" className="block text-center text-sm">
            Don’t have an account? Register
          </Link>
        </form>

        <div className="my-6 text-center text-sm text-slate-400">OR</div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Login Failed ❌")}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
