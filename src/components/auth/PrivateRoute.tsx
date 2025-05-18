import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
  redirectTo = '/login',
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
