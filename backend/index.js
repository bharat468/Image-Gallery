import express from "express";
import connectToDB from "./db/connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/Auth.js";
import adminRouter from "./routes/admin.js";
import imageRouter from "./routes/imageRoutes.js";
import checkRouter from "./routes/check.js";   

const app = express();
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [frontendUrl, "http://localhost:5173"],
    credentials: true,
  })
);

connectToDB();

app.use("/user", authRouter);
app.use("/admin", adminRouter);
app.use("/image", imageRouter);
app.use("/check", checkRouter); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
