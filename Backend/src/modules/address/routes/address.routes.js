import express from "express";

import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller.js";

import {
  protect,
} from "../../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addAddress);

router.get("/", protect, getAddresses);

router.put("/:id", protect, updateAddress);

router.delete("/:id", protect, deleteAddress);

export default router;