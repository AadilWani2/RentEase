import {
  addToCartService,
  getCartService,
  removeCartItemService,
  updateCartItemService,
  clearCartService,
} from "../services/cart.service.js";

export const addToCart = async (
  req,
  res
) => {
  try {
    const {
      productId,
      quantity,
      tenureMonths,
    } = req.body;

    const cart =
      await addToCartService(
        req.user._id,
        productId,
        quantity,
        tenureMonths
      );

    res.status(200).json({
      success: true,
      message:
        "Product added to cart",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCart = async (
  req,
  res
) => {
  try {
    const cart =
      await getCartService(
        req.user._id
      );

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeCartItem =
  async (req, res) => {
    try {
      const cart =
        await removeCartItemService(
          req.user._id,
          req.params.productId
        );

      res.status(200).json({
        success: true,
        message:
          "Item removed from cart",
        data: cart,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const updateCartItem =
  async (req, res) => {
    try {
      const {
        quantity,
        tenureMonths,
      } = req.body;

      const cart =
        await updateCartItemService(
          req.user._id,
          req.params.productId,
          quantity,
          tenureMonths
        );

      res.status(200).json({
        success: true,
        message:
          "Cart updated successfully",
        data: cart,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const clearCart = async (
  req,
  res
) => {
  try {
    const cart =
      await clearCartService(
        req.user._id
      );

    res.status(200).json({
      success: true,
      message:
        "Cart cleared successfully",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};