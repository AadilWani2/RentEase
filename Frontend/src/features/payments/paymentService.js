import axiosInstance from "../../api/axios";

export const createRazorpayOrder =
  async (orderId) => {
    const response =
      await axiosInstance.post(
        `/payments/create-order/${orderId}`
      );

    return response.data.data;
  };

export const verifyPayment =
  async (data) => {
    const response =
      await axiosInstance.post(
        "/payments/verify",
        data
      );

    return response.data.data;
  };