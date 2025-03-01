// src/components/PrivateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    // User is not authenticated
    return <Navigate to="/dang-nhap" />;
  }

  if (roles && !roles.includes(user.role)) {
    // User does not have the required role
    return <Navigate to="/" />;
  }

  // User is authenticated and has the required role
  return children;
};

export default PrivateRoute;
