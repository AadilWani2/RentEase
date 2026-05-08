import axiosInstance from "../../api/axios";

export const createMaintenanceRequest =
  async (data) => {
    const response =
      await axiosInstance.post(
        "/maintenance",
        data
      );

    return response.data.data;
  };

export const getMyMaintenanceRequests =
  async () => {
    const response =
      await axiosInstance.get(
        "/maintenance/my-requests"
      );

    return response.data.data;
  };

export const getAllMaintenanceRequests =
  async () => {
    const response =
      await axiosInstance.get(
        "/maintenance"
      );

    return response.data.data;
  };

export const updateMaintenanceStatus =
  async (id, status) => {
    const response =
      await axiosInstance.put(
        `/maintenance/${id}`,
        {
          status,
        }
      );

    return response.data.data;
  };