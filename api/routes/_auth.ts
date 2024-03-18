import express from "express";
import * as userController from "../controllers/_userController.js";
import { validateLogin } from "../middlewares/_validator.js";
import { formDataParser } from "../middlewares/_cloudinary.js";
import { verifyToken } from "../middlewares/_verifyToken.js";

const router = express.Router();

router.post("/login", validateLogin, userController.loginUser);
router.post("/logout", userController.logoutUser);
router.put(
  "/update/:id",
  formDataParser.single("avatar"),
  userController.updateUser
);
router.get("/validate-token", verifyToken, userController.validateToken);

export default router;
