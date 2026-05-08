import express from "express";

import {
  createMaintenance,
  getMyMaintenance,
  getAllMaintenance,
  updateMaintenanceStatus,
} from "../controllers/maintenance.controller.js";

import {
  protect,
  authorizeRoles,
} from "../../../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createMaintenance
);

router.get(
  "/my",
  protect,
  getMyMaintenance
);

router.get(
  "/",
  protect,
  authorizeRoles("admin", "vendor"),
  getAllMaintenance
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "vendor"),
  updateMaintenanceStatus
);

export default router;