import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import "dotenv/config";
import authRoutes from "./routes/_auth.js";
import listingRoutes from "./routes/_listings.js";

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
app.use("/api/listings", listingRoutes);

app.listen(8000);
