import {
  useState,
} from "react";

import {
  FaBell,
} from "react-icons/fa";

import {
  useNotifications,
} from "../../features/notifications/NotificationContext";

const NotificationDropdown =
  () => {
    const [open, setOpen] =
      useState(false);

    const {
      notifications,
      unreadCount,
      markAsRead,
    } = useNotifications();

    return (
      <div className="relative">
        
        {/* Bell */}
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="relative"
        >
          <FaBell className="text-2xl text-gray-700" />

          {unreadCount >
            0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {
                unreadCount
              }
            </span>
          )}
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-4 w-96 bg-white rounded-2xl shadow-xl border z-50">
            
            <div className="p-6 border-b">
              
              <h2 className="text-2xl font-bold">
                Notifications
              </h2>
            </div>

            <div className="max-h-96 overflow-y-auto">
              
              {notifications.length ===
              0 ? (
                <div className="p-6 text-gray-600">
                  No notifications found.
                </div>
              ) : (
                notifications.map(
                  (
                    notification
                  ) => (
                    <button
                      key={
                        notification._id
                      }
                      onClick={() =>
                        markAsRead(
                          notification._id
                        )
                      }
                      className={`w-full text-left p-6 border-b hover:bg-gray-50 transition ${
                        !notification.isRead
                          ? "bg-blue-50"
                          : ""
                      }`}
                    >
                      <p className="font-semibold">
                        {
                          notification.title
                        }
                      </p>

                      <p className="mt-2 text-gray-600 text-sm">
                        {
                          notification.message
                        }
                      </p>

                      <p className="mt-3 text-xs text-gray-400">
                        {
                          new Date(
                            notification.createdAt
                          ).toLocaleString()
                        }
                      </p>
                    </button>
                  )
                )
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

export default NotificationDropdown;