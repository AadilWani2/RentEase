import axiosInstance from "../../api/axios";

export const getAddresses =
  async () => {
    const response =
      await axiosInstance.get(
        "/addresses"
      );

    return response.data.data;
  };

export const addAddress =
  async (data) => {
    const response =
      await axiosInstance.post(
        "/addresses",
        data
      );

    return response.data.data;
  };