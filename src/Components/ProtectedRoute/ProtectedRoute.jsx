import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If the user is not logged in, redirect to the /login page
    return <Navigate to="/login" />;
  }

  // If the user is logged in, show the component that was passed in
  return children;
};

export default ProtectedRoute;