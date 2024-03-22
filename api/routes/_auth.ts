import express from "express";
import * as userController from "../controllers/_userController.js";
import {
  rejectOnValidationErrors,
  validateLogin,
  validateRegister,
  validateUpdate,
} from "../middlewares/_validator.js";
import { mult } from "../middlewares/_cloudinary.js";
import { verifyToken } from "../middlewares/_verifyToken.js";

const router = express.Router();

router.post(
  "/login",
  validateLogin,
  rejectOnValidationErrors,
  userController.loginUser
);
router.post(
  "/register",
  validateRegister,
  rejectOnValidationErrors,
  userController.registerUser
);
router.post("/logout", userController.logoutUser);
router.put(
  "/update",
  verifyToken,
  mult.single("avatar"),
  validateUpdate,
  rejectOnValidationErrors,
  userController.updateUser
);
router.get("/validate-token", verifyToken, userController.validateToken);

export default router;
