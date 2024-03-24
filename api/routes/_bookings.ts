import express from "express";
import {
  rejectOnValidationErrors,
  validateBooking,
  validateBookingCancellation,
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
  bookingController.setBookingStatus
);
router.post(
  "/cancel/:id",
  verifyToken,
  validateBookingCancellation,
  rejectOnValidationErrors,
  bookingController.setBookingStatus
);
router.get("/all", verifyToken, bookingController.getAllBookings);
router.get("/all/:id", verifyToken, bookingController.getOneBooking);
router.get("/customers", verifyToken, bookingController.getCustomers);
router.get("/customers/new", verifyToken, bookingController.newCustomers);

export default router;
