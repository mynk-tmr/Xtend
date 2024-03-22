import { validationResult, body } from "express-validator";
import { Request, Response, NextFunction } from "express";

export function rejectOnValidationErrors(
  request: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(request).array();
  const errorMessages =
    errors.length === 0 ? null : errors.map(({ msg }) => msg);
  if (errorMessages) return res.status(400).send(errorMessages);
  else next();
}

export const validateLogin = [
  body("email", "invalid email").isEmail(),
  body("password", "invalid password").isLength({ min: 8 }),
];

export const validateRegister = [
  body("email", "invalid email").isEmail(),
  body("password", "invalid password").isLength({ min: 8 }),
  body("fullname", "invalid fullname")
    .isLength({ min: 3 })
    .matches(/^[a-z ]*$/i),
];

export const validateUpdate = [
  body("email", "invalid email").isEmail(),
  body("fullname", "invalid fullname")
    .isLength({ min: 3 })
    .matches(/^[a-z ]*$/i),
];

export const validateListing = [
  body("state", "invalid state").notEmpty(),
  body("city", "invalid city").notEmpty(),
  body("pincode", "invalid pincode").isInt({ min: 100000, max: 999999 }),
  body("locality", "invalid locality").notEmpty(),

  body("category", "invalid category").notEmpty(),
  body("facilities", "invalid facilities").notEmpty(),

  body("name", "invalid name").isLength({ min: 3 }),
  body("description", "invalid description").isLength({ min: 20 }),

  body("price", "invalid price").isInt({ min: 1 }),
  body("discount", "invalid discount").isInt({ min: 0 }),
  body("width", "invalid width").isInt({ min: 1 }),
  body("height", "invalid height").isInt({ min: 1 }),
  body("area", "invalid area").isFloat({ min: 1 }),
];

export const validateBooking = [
  body("start", "invalid start date").isISO8601(),
  body("end", "invalid end date").isISO8601(),
];
