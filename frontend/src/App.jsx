import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

/* USER */
import First from "./pages/First";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Liked from "./pages/Liked";
import NotFound from "./pages/NotFound";

/* ADMIN */
import AdminLogin from "./admin/pages/AdminLogin";
import AdminHome from "./admin/pages/AdminHome";
import UploadImage from "./admin/pages/UploadImage";
import ImageList from "./admin/pages/ImageList";
import EditImage from "./admin/pages/EditImage";

/* COMMON */
import AdminLayout from "./admin/components/AdminLayout";
import ProtectedRouters from "./admin/components/ProtectedRouters";
import AuthProvider from "./contexts/AuthProvider";
import UserList from "./admin/pages/UserList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      /* ❤️ USER LOGIN REQUIRED */
      {
        path: "liked",
        element: (
          <ProtectedRouters referer="user">
            <Liked />
          </ProtectedRouters>
        ),
      },

      { path: "about", element: <About /> },
    ],
  },

  { path: "/admin/login", element: <AdminLogin /> },

  {
    path: "/admin",
    element: (
      <ProtectedRouters referer="admin">
        <AdminLayout />
      </ProtectedRouters>
    ),
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home", element: <AdminHome /> },
      { path: "image/upload", element: <UploadImage /> },
      { path: "images", element: <ImageList /> },
      { path: "image/edit/:id", element: <EditImage /> },
      { path: "users", element: <UserList /> },

    ],
  },
  { path: "*", element: <NotFound /> }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
