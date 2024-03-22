import { User } from "../models/_user.js";
import setJWTCookieInResponse from "../middlewares/_jwt.js";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { uploadFile } from "../middlewares/_cloudinary.js";

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).send("Invalid credentials");
    await user.save();
    setJWTCookieInResponse(res, user.id).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function registerUser(req: Request, res: Response) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.sendStatus(409);
    user = new User(req.body);
    await user.save();
    setJWTCookieInResponse(res, user.id).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function logoutUser(req: Request, res: Response) {
  res.cookie("auth_token", "", { expires: new Date(0) });
  res.sendStatus(200);
}

export async function updateUser(req: Request, res: Response) {
  try {
    for (const key in req.body) if (!req.body[key]) delete req.body[key];
    const user = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });
    if (req.file && req.file.mimetype.startsWith("image/"))
      user.avatar = await uploadFile(req.file);
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function validateToken(req: Request, res: Response) {
  const user = await User.findById(req.userId).select("-password");
  res.status(200).send(user);
}
