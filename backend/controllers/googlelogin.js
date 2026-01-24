import { OAuth2Client } from "google-auth-library";
import Auth from "../models/Authmodel.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture, sub } = ticket.getPayload();

    let user = await Auth.findOne({ email });

    if (!user) {
      user = await Auth.create({
        name,
        email,
        googleId: sub,
        authProvider: "google",
        role: "user", // 🔥 IMPORTANT
      });
    }

    const authToken = jwt.sign(
      {
        id: user._id,
        role: "user", // 🔥 VERY IMPORTANT
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 COOKIE SET KARO
    res.cookie("auth_token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      token: authToken,
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Google login failed" });
  }
};
