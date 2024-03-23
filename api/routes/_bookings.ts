import express from "express";
import {
  rejectOnValidationErrors,
  validateBooking,
  validateBookingConfirmation,
} from "../middlewares/_validator.js";
import { verifyToken } from "../middlewares/_verifyToken.js";
import * as bookingController from "../controllers/_bookingController.js";

const router = express.Router();
router.post(
  "/request/:id",
  verifyToken,
  validateBooking,
  rejectOnValidationErrors,
  bookingController.requestBooking
);
router.post(
  "/confirm/:id",
  verifyToken,
  validateBookingConfirmation,
  rejectOnValidationErrors,
  bookingController.confirmBooking
);
router.get("/all", verifyToken, bookingController.getAllBookings);
router.get("/all/:id", verifyToken, bookingController.getOneBooking);
router.post("/cancel/:id", verifyToken, bookingController.cancelBooking);

export default router;
