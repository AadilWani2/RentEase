import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["furniture", "appliance"],
    },

    subCategory: {
      type: String,
      required: true,
    },

    description: {
      type: String,
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

    stock: {
      type: Number,
      required: true,
      default: 1,
    },

    availableQuantity: {
      type: Number,
      required: true,
      default: 1,
    },

    brand: {
      type: String,
    },

    images: [
      {
        type: String,
      },
    ],

    cityAvailability: [
      {
        type: String,
      },
    ],

    tenureOptions: [
      {
        type: Number,
      },
    ],

    averageRating: {
        type: Number,
        default: 0,
    },

    totalReviews: {
        type: Number,
        default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;