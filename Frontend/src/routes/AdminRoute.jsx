import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../features/auth/AuthContext";

const AdminRoute = ({
  children,
}) => {
  const { user, loading } =
    useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (
    !user ||
    user.role !== "admin"
  ) {
    return (
      <Navigate to="/" />
    );
  }

  return children;
};

export default AdminRoute;