import mongoose from "mongoose";

const cartItemSchema =
  new mongoose.Schema({
    product: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    tenureMonths: {
      type: Number,
      required: true,
    },

    monthlyRent: {
      type: Number,
      required: true,
    },

    securityDeposit: {
      type: Number,
      required: true,
    },
  });

const cartSchema = new mongoose.Schema(
  {
    user: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [cartItemSchema],

    subtotal: {
      type: Number,
      default: 0,
    },

    totalSecurityDeposit: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model(
  "Cart",
  cartSchema
);

export default Cart;