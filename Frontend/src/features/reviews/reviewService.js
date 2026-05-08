import axiosInstance from "../../api/axios";

export const getProductReviews =
  async (productId) => {
    const response =
      await axiosInstance.get(
        `/reviews/${productId}`
      );

    return response.data.data;
  };

export const createReview =
  async (
    productId,
    reviewData
  ) => {
    const response =
      await axiosInstance.post(
        `/reviews/${productId}`,
        reviewData
      );

    return response.data.data;
  };