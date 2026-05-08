import express from "express";

import {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
  clearCart,
} from "../controllers/cart.controller.js";

import {
  protect,
} from "../../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addToCart);

router.get("/", protect, getCart);

router.put(
  "/:productId",
  protect,
  updateCartItem
);

router.delete(
  "/:productId",
  protect,
  removeCartItem
);

router.delete(
  "/clear/all",
  protect,
  clearCart
);

export default router;