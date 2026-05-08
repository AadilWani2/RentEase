import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axiosInstance from "../../api/axios";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser =
    async () => {
      try {
        const response =
          await axiosInstance.get(
            "/auth/me"
          );

        setUser(response.data.data);
      } catch (error) {
        localStorage.removeItem(
          "token"
        );
      } finally {
        setLoading(false);
      }
    };

  const login = async (
    email,
    password
  ) => {
    const response =
      await axiosInstance.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

    const token =
      response.data.token;

    localStorage.setItem(
      "token",
      token
    );

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;

    setUser(response.data.data);
    return response.data.data;
  };

  const register = async (
    formData
  ) => {
    const response =
      await axiosInstance.post(
        "/auth/register",
        formData
      );

    const token =
      response.data.token;

    localStorage.setItem(
      "token",
      token
    );

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;

    setUser(response.data.data);
  };

  const logout = () => {
    localStorage.removeItem("token");

    delete axiosInstance.defaults.headers
      .common["Authorization"];

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);