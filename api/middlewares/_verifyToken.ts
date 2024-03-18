import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare module "express" {
  interface Request {
    userId: string;
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["auth_token"];
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY) as {
      userId: string;
    };
    req.userId = userId;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
