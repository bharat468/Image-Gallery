import jwt from "jsonwebtoken"
import "dotenv/config"



export async function checkAuth(req, res, next) {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: "Login required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id.toString();
    next();
  } catch (err) {
    console.log("AUTH ERROR 👉", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}




export async function checkForlogin(req, res) {
  try {
    const { referer } = req.query;

    if (!referer) {
      return res.status(422).json({
        loggedIn: false,
        message: "referer missing",
      });
    }

    let token;

    if (referer === "admin") token = req.cookies.admin_token;
    if (referer === "user") token = req.cookies.auth_token;

    if (!token) {
      return res.status(200).json({
        loggedIn: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔐 role match check
    if (decoded.role !== referer) {
      return res.status(200).json({
        loggedIn: false,
      });
    }

    // ✅ SUCCESS
    return res.status(200).json({
      loggedIn: true,
      role: decoded.role,
      userId: decoded.id,
    });

  } catch (error) {
    return res.status(200).json({
      loggedIn: false,
    });
  }
}