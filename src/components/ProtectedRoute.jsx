
import React from 'react';
import { Navigate,useLocation } from 'react-router-dom';
const validRoutes = [
  "/dashboard",
  "/analytics",
  "/create-quiz",
  "/analytics/question-analysis",
  "/analytics/poll/question-analysis"
];

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isAuthenticated = !!localStorage.getItem('token');
  const isValidRoute = validRoutes.includes(currentPath);

  if (!isAuthenticated || !isValidRoute) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
