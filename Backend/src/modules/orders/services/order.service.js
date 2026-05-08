import Order from "../models/order.model.js";
import Rental from "../../rental/models/rental.model.js";
import sendEmail from "../../../utils/sendEmail.js";

import User from "../../auth/models/user.model.js";
import Product from "../../products/models/product.model.js";

export const createOrderService =
  async (data, userId) => {
    const {
      rentalId,
      shippingAddress,
      paymentMethod,
    } = data;

    const rental =
      await Rental.findById(
        rentalId
      ).populate("product");

    if (!rental) {
      throw new Error("Rental not found");
    }

    const product = rental.product;

    const subtotal =
      rental.monthlyRent *
        rental.tenureMonths +
      rental.securityDeposit;

    const deliveryFee = 200;

    const taxAmount = subtotal * 0.05;

    const totalAmount = subtotal + deliveryFee + taxAmount;

    const order = await Order.create({
      user: userId,

      rental: rental._id,

      orderItems: [
        {
          product: product._id,

          title: product.title,

          quantity: 1,

          monthlyRent:
            rental.monthlyRent,

          securityDeposit:
            rental.securityDeposit,

          tenureMonths:
            rental.tenureMonths,
        },
      ],

      shippingAddress,

      paymentMethod,

      subtotal,

      deliveryFee,

      taxAmount,

      totalAmount,
    });

    const user = await User.findById(
      userId
    );

    await sendEmail({
      to: user.email,

      subject:
        "RentEase Order Confirmation",

      text: `
        Your order has been placed successfully.

        Order Total: ₹${totalAmount}

        Payment Method: ${paymentMethod}

        Thank you for choosing RentEase.
      `,
    });

    return order;
};

export const getMyOrdersService =
  async (userId) => {
    return await Order.find({
      user: userId,
    })
      .populate("orderItems.product")
      .sort({
        createdAt: -1,
      });
  };

export const getAllOrdersService =
  async () => {
    return await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({
        createdAt: -1,
      });
  };

export const updateOrderStatusService =
  async (id, data) => {
    return await Order.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
  };