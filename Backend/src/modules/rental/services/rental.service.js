import Rental from "../models/rental.model.js";
import Product from "../../products/models/product.model.js";
import sendEmail from "../../../utils/sendEmail.js";

import User from "../../auth/models/user.model.js";

export const createRentalService =
  async (rentalData, userId) => {
    const {
      productId,
      tenureMonths,
      deliveryAddress,
      rentalStartDate,
    } = rentalData;

    const product =
      await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.availableQuantity <= 0) {
      throw new Error(
        "Product currently unavailable"
      );
    }

    const rentalEndDate = new Date(
      rentalStartDate
    );

    rentalEndDate.setMonth(
      rentalEndDate.getMonth() +
        tenureMonths
    );

    const totalAmount =
      product.monthlyRent *
        tenureMonths +
      product.securityDeposit;

    const rental = await Rental.create({
        user: userId,

        product: productId,

        rentalStartDate,

        rentalEndDate,

        tenureMonths,

        monthlyRent:product.monthlyRent,

        securityDeposit:product.securityDeposit,

        totalAmount,

        deliveryAddress,
    });

    product.availableQuantity -= 1;

    await product.save();

    const user = await User.findById(
      userId
    );

    await sendEmail({
      to: user.email,

      subject:
        "RentEase Rental Confirmation",

      text: `
        Your rental has been confirmed.

        Product: ${product.title}

        Tenure: ${tenureMonths} months

        Total Amount: ₹${totalAmount}

        Thank you for using RentEase.
        `,
    });

    return rental;
};

export const getMyRentalsService =
  async (userId) => {
    return await Rental.find({
      user: userId,
    })
      .populate("product")
      .sort({
        createdAt: -1,
      });
  };

export const returnRentalService =
  async (rentalId) => {
    const rental =
      await Rental.findById(rentalId);

    if (!rental) {
      throw new Error("Rental not found");
    }

    if (rental.status === "returned") {
      throw new Error(
        "Rental already returned"
      );
    }

    rental.status = "returned";

    await rental.save();

    const product =
      await Product.findById(
        rental.product
      );

    if (product) {
      product.availableQuantity += 1;

      await product.save();
    }

    return rental;
  };

export const extendRentalService =
  async (rentalId, extraMonths) => {
    const rental =
      await Rental.findById(rentalId);

    if (!rental) {
      throw new Error("Rental not found");
    }

    rental.tenureMonths += extraMonths;

    rental.rentalEndDate.setMonth(
      rental.rentalEndDate.getMonth() +
        extraMonths
    );

    rental.totalAmount +=
      rental.monthlyRent * extraMonths;

    await rental.save();

    return rental;
  };