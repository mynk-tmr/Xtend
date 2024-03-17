import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/_auth.js";
import mongoose from "mongoose";
import "dotenv/config";

await mongoose.connect(process.env.MONGO_URI);
console.log("\n\n\n", "connected to DB");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json()); // for parsing json
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", authRoutes);

app.listen(8000);
