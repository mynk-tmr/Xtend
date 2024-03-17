import { validationResult, body } from "express-validator";
import { Request } from "express";

export function getValidationErrors(request: Request) {
  const errors = validationResult(request).array();
  return errors.length === 0 ? null : errors.map(({ msg }) => msg);
}

export const validateLogin = [
  body("email", "invalid email").isEmail(),
  body("password", "invalid password").isLength({ min: 8 }),
];
