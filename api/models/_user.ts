import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const requiredString = { type: String, required: true };
const uniqueString = { ...requiredString, unique: true };
const requiredDate = { type: Date, required: true };

const userSchema = new mongoose.Schema({
  email: uniqueString,
  password: requiredString,
  fullname: { type: String },
  avatar: { type: String },
  joined: requiredDate,
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

export const User = mongoose.model("User", userSchema);
