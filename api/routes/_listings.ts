import express from "express";
import { mult } from "../middlewares/_cloudinary.js";
import { validateListing } from "../middlewares/_validator.js";
import { verifyToken } from "../middlewares/_verifyToken.js";
import * as listingController from "../controllers/_listingController.js";

const router = express.Router();
router.post(
  "/add",
  verifyToken,
  validateListing,
  mult.array("images", 6),
  listingController.addList
);

router.put(
  "/:id",
  verifyToken,
  validateListing,
  mult.array("images", 6),
  listingController.updateList
);

router.get("/all", verifyToken, listingController.getAllUserList);

router.get("/:id", verifyToken, listingController.getOneUserList);

router.delete("/:id", verifyToken, listingController.deleteList);

export default router;
