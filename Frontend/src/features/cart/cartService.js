import axiosInstance from "../../api/axios";

export const addToCart = async (
  productId,
  quantity,
  tenureMonths
) => {
  const response =
    await axiosInstance.post(
      "/cart",
      {
        productId,
        quantity,
        tenureMonths,
      }
    );

  return response.data.data;
};

export const getCart =
  async () => {
    const response =
      await axiosInstance.get(
        "/cart"
      );

    return response.data.data;
  };

export const updateCartItem =
  async (
    productId,
    quantity,
    tenureMonths
  ) => {
    const response =
      await axiosInstance.put(
        `/cart/${productId}`,
        {
          quantity,
          tenureMonths,
        }
      );

    return response.data.data;
  };

export const removeCartItem =
  async (productId) => {
    const response =
      await axiosInstance.delete(
        `/cart/${productId}`
      );

    return response.data.data;
  };