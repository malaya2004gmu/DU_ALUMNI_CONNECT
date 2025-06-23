import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    // Redirect to login or error page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;