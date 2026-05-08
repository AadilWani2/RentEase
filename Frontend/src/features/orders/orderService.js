import axiosInstance from "../../api/axios";

export const createOrder =
  async (data) => {
    const response =
      await axiosInstance.post(
        "/orders",
        data
      );

    return response.data.data;
  };

export const getMyOrders =
  async () => {
    const response =
      await axiosInstance.get(
        "/orders/my-orders"
      );

    return response.data.data;
  };