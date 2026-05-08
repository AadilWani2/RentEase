import axiosInstance from "../../api/axios";

export const getWishlist =
  async () => {
    const response =
      await axiosInstance.get(
        "/wishlist"
      );

    return response.data.data;
  };

export const toggleWishlist =
  async (productId) => {
    const response =
      await axiosInstance.post(
        `/wishlist/${productId}`
      );

    return response.data.data;
  };

export const removeFromWishlist =
  async (productId) => {
    const response =
      await axiosInstance.delete(
        `/wishlist/${productId}`
      );

    return response.data.data;
  };