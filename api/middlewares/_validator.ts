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

export const validateUpdate = [
  body("email", "invalid email").optional().isEmail(),
  body("fullname", "invalid fullname")
    .optional()
    .matches(/^[a-zA-Z\s]*$/i),
];
