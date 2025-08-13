import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { LoadingOverlay } from "@mantine/core";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <LoadingOverlay visible={true} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
