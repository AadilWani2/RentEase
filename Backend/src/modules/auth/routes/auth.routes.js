import express from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/auth.controller.js";

import { protect } from "../../../middleware/auth.middleware.js";

import validate from "../../../middleware/validate.middleware.js";

import {
  registerValidation,
  loginValidation,
} from "../../../validations/auth.validation.js";

const router =
  express.Router();

router.post(
  "/register",
  validate(registerValidation),
  registerUser
);

router.post(
  "/login",
  validate(loginValidation),
  loginUser
);

router.get(
  "/me",
  protect,
  getCurrentUser
);

export default router;