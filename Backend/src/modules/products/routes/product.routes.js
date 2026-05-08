import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect, authorizeRoles } from "../../../middleware/auth.middleware.js";
import upload from "../../../middleware/upload.middleware.js";
import validate from "../../../middleware/validate.middleware.js";
import { productValidation } from "../../../validations/product.validation.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.array("images", 5),
  validate(productValidation),
  createProduct
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteProduct
);

export default router;