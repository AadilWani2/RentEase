import axiosInstance from "../../api/axios";

export const getAdminAnalytics =
  async () => {
    const response =
      await axiosInstance.get(
        "/admin/analytics"
      );

    return response.data.data;
  };