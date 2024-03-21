import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User as UserType } from "@/types/user";

const requiredString = { type: String, required: true };
const uniqueString = { ...requiredString, unique: true };
const requiredDate = { type: Date, required: true };

interface U extends Omit<UserType, "joined"> {
  joined: Date;
}

const userSchema = new mongoose.Schema<U>({
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
