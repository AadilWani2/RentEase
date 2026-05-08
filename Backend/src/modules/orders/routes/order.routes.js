import express from "express";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

import {
  protect,
  authorizeRoles,
} from "../../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/my", protect, getMyOrders);

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllOrders
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateOrderStatus
);

export default router;