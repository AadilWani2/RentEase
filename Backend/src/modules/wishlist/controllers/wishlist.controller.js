import {
  addToWishlistService,
  getWishlistService,
  removeWishlistService,
} from "../services/wishlist.service.js";

export const addToWishlist = async (
  req,
  res
) => {
  try {
    const wishlist =
      await addToWishlistService(
        req.user._id,
        req.params.productId
      );

    res.status(201).json({
      success: true,
      message:
        "Product added to wishlist",
      data: wishlist,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWishlist = async (
  req,
  res
) => {
  try {
    const wishlist =
      await getWishlistService(
        req.user._id
      );

    res.status(200).json({
      success: true,
      count: wishlist.length,
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFromWishlist =
  async (req, res) => {
    try {
      await removeWishlistService(
        req.user._id,
        req.params.productId
      );

      res.status(200).json({
        success: true,
        message:
          "Product removed from wishlist",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };