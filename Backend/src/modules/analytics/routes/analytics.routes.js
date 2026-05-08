import express from "express";

import {
  getDashboardAnalytics,
} from "../controllers/analytics.controller.js";

import {
  protect,
  authorizeRoles,
} from "../../../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin"),
  getDashboardAnalytics
);

export default router;