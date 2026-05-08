import express from "express";

import {
  createRental,
  getMyRentals,
  returnRental,
  extendRental,
} from "../controllers/rental.controller.js";

import {
  protect,
} from "../../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createRental);

router.get("/my", protect, getMyRentals);

router.put(
  "/return/:id",
  protect,
  returnRental
);

router.put(
  "/extend/:id",
  protect,
  extendRental
);

export default router;