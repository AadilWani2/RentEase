import axiosInstance from "../../api/axios";

export const getAdminProducts =
  async () => {
    const response =
      await axiosInstance.get(
        "/products"
      );

    return response.data.data;
  };

export const createProduct =
  async (formData) => {
    const response =
      await axiosInstance.post(
        "/products",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data.data;
  };

export const deleteProduct =
  async (id) => {
    const response =
      await axiosInstance.delete(
        `/products/${id}`
      );

    return response.data.data;
  };