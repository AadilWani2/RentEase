import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getNotifications,
  markNotificationAsRead,
} from "./notificationService";

import {
  useAuth,
} from "../auth/AuthContext";

const NotificationContext =
  createContext();

export const NotificationProvider =
  ({ children }) => {
    const { user } =
      useAuth();

    const [notifications,
      setNotifications] =
      useState([]);

    useEffect(() => {
      if (user) {
        fetchNotifications();
      } else {
        setNotifications([]);
      }
    }, [user]);

    const fetchNotifications =
      async () => {
        try {
          const data =
            await getNotifications();

          setNotifications(data);
        } catch (error) {
          console.log(error);
        }
      };

    const markAsRead =
      async (id) => {
        try {
          await markNotificationAsRead(
            id
          );

          setNotifications(
            notifications.map(
              (
                notification
              ) =>
                notification._id ===
                id
                  ? {
                      ...notification,
                      isRead: true,
                    }
                  : notification
            )
          );
        } catch (error) {
          console.log(error);
        }
      };

    const unreadCount =
      notifications.filter(
        (
          notification
        ) =>
          !notification.isRead
      ).length;

    return (
      <NotificationContext.Provider
        value={{
          notifications,
          unreadCount,
          markAsRead,
        }}
      >
        {children}
      </NotificationContext.Provider>
    );
  };

export const useNotifications =
  () =>
    useContext(
      NotificationContext
    );