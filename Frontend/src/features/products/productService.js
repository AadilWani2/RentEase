import axiosInstance from "../../api/axios";

export const getProducts =
  async (params = {}) => {
    const response =
      await axiosInstance.get(
        "/products",
        {
          params,
        }
      );

    return response.data.data;
  };

export const getFeaturedProducts =
  async () => {
    const response =
      await axiosInstance.get(
        "/products",
        {
          params: {
            limit: 6,
          },
        }
      );

    return response.data.data;
  };

export const getProductById =
  async (id) => {
    const response =
      await axiosInstance.get(
        `/products/${id}`
      );

    return response.data.data;
  };