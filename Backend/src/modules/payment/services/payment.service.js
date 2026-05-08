import crypto from "crypto";

import razorpay from "../../../config/razorpay.js";

import Order from "../../orders/models/order.model.js";

export const createRazorpayOrderService =
  async (orderId) => {
    const order =
      await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    const options = {
      amount:
        Math.round(
          order.totalAmount * 100
        ),

      currency: "INR",

      receipt: order._id.toString(),
    };

    const razorpayOrder =
      await razorpay.orders.create(
        options
      );

    return razorpayOrder;
  };

export const verifyPaymentService =
  async (data) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = data;

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET
        )
        .update(
          razorpay_order_id +
            "|" +
            razorpay_payment_id
        )
        .digest("hex");

    const isValid =
      generatedSignature ===
      razorpay_signature;

    if (!isValid) {
      throw new Error(
        "Payment verification failed"
      );
    }

    const order =
      await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.paymentStatus = "paid";

    order.orderStatus = "confirmed";

    await order.save();

    return order;
  };