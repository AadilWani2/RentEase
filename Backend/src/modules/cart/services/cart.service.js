import Cart from "../models/cart.model.js";

import Product from "../../products/models/product.model.js";

const calculateCartTotals = (cart) => {
  let subtotal = 0;

  let totalSecurityDeposit = 0;

  cart.items.forEach((item) => {
    subtotal +=
      item.monthlyRent *
      item.tenureMonths *
      item.quantity;

    totalSecurityDeposit +=
      item.securityDeposit *
      item.quantity;
  });

  cart.subtotal = subtotal;

  cart.totalSecurityDeposit =
    totalSecurityDeposit;

  cart.totalAmount =
    subtotal + totalSecurityDeposit;
};

export const addToCartService =
  async (
    userId,
    productId,
    quantity,
    tenureMonths
  ) => {
    const product =
      await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    let cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
      });
    }

    const existingItem =
      cart.items.find(
        (item) =>
          item.product.toString() ===
          productId
      );

    if (existingItem) {
      existingItem.quantity += quantity;

      existingItem.tenureMonths =
        tenureMonths;
    } else {
      cart.items.push({
        product: productId,

        quantity,

        tenureMonths,

        monthlyRent:
          product.monthlyRent,

        securityDeposit:
          product.securityDeposit,
      });
    }

    calculateCartTotals(cart);

    await cart.save();

    return cart;
  };

export const getCartService =
  async (userId) => {
    return await Cart.findOne({
      user: userId,
    }).populate("items.product");
  };

export const removeCartItemService =
  async (userId, productId) => {
    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.items = cart.items.filter(
      (item) =>
        item.product.toString() !==
        productId
    );

    calculateCartTotals(cart);

    await cart.save();

    return cart;
  };

export const updateCartItemService =
  async (
    userId,
    productId,
    quantity,
    tenureMonths
  ) => {
    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const item = cart.items.find(
      (item) =>
        item.product.toString() ===
        productId
    );

    if (!item) {
      throw new Error(
        "Cart item not found"
      );
    }

    item.quantity = quantity;

    item.tenureMonths =
      tenureMonths;

    calculateCartTotals(cart);

    await cart.save();

    return cart;
  };

export const clearCartService =
  async (userId) => {
    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.items = [];

    calculateCartTotals(cart);

    await cart.save();

    return cart;
  };