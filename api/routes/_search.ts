import express from "express";
import * as listingController from "../controllers/_listingController.js";

const router = express.Router();
router.get("/", listingController.getAllList);
router.get("/:id", listingController.getOneList);

export default router;
