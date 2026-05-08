import Wishlist from "../models/wishlist.model.js";
import Product from "../../products/models/product.model.js";

export const addToWishlistService =
  async (userId, productId) => {
    const product =
      await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    const existingWishlist =
      await Wishlist.findOne({
        user: userId,
        product: productId,
      });

    if (existingWishlist) {
      throw new Error(
        "Product already in wishlist"
      );
    }

    const wishlist =
      await Wishlist.create({
        user: userId,
        product: productId,
      });

    return wishlist;
  };

export const getWishlistService =
  async (userId) => {
    return await Wishlist.find({
      user: userId,
    })
      .populate("product")
      .sort({
        createdAt: -1,
      });
  };

export const removeWishlistService =
  async (userId, productId) => {
    const wishlist =
      await Wishlist.findOneAndDelete({
        user: userId,
        product: productId,
      });

    if (!wishlist) {
      throw new Error(
        "Wishlist item not found"
      );
    }

    return wishlist;
  };