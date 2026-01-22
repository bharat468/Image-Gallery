import Auth from "../models/Authmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ================= REGISTER USER ================= */
export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await Auth.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Auth.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      authProvider: "local",
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= LOGIN USER ================= */
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.blocked)
      return res.status(403).json({ message: "Account is blocked" });

    if (user.authProvider !== "local")
      return res.status(400).json({ message: "Login using Google" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= LOGOUT USER ================= */
export async function logoutUser(req, res) {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= GET ALL USERS (ADMIN) ================= */
export async function getUsers(req, res) {
  try {
    const users = await Auth.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= UPDATE USER ================= */
export async function updateUser(req, res) {
  try {
    const { id } = req.params;

    const updatedUser = await Auth.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= DELETE USER ================= */
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const deletedUser = await Auth.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= BLOCK / UNBLOCK USER ================= */
export async function userBlock(req, res) {
  try {
    const { id } = req.params;
    const { blocked } = req.body;

    const user = await Auth.findByIdAndUpdate(
      id,
      { blocked },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "User status updated",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
