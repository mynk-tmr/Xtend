import jwt from "jsonwebtoken";
import { Response } from "express";

export default function setJWTCookieInResponse(res: Response, userId: string) {
  const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  const ONE_DAY = 24 * 60 * 60 * 1000;
  res.cookie("auth_token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_DAY,
  });
  return res;
}
