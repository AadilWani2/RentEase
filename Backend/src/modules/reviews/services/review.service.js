import Review from "../models/review.model.js";
import Product from "../../products/models/product.model.js";

export const createReviewService =
  async (
    productId,
    userId,
    reviewData
  ) => {
    const product =
      await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    const existingReview =
      await Review.findOne({
        user: userId,
        product: productId,
      });

    if (existingReview) {
      throw new Error(
        "You already reviewed this product"
      );
    }

    const review = await Review.create({
      user: userId,
      product: productId,
      rating: reviewData.rating,
      comment: reviewData.comment,
    });

    const reviews = await Review.find({
      product: productId,
    });

    const average =
      reviews.reduce(
        (acc, item) =>
          acc + item.rating,
        0
      ) / reviews.length;

    product.averageRating =
      average.toFixed(1);

    product.totalReviews =
      reviews.length;

    await product.save();

    return review;
  };

export const getProductReviewsService =
  async (productId) => {
    return await Review.find({
      product: productId,
    })
      .populate("user", "name")
      .sort({
        createdAt: -1,
      });
  };