import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useAuth();
  const location = useLocation(); // Gets the current URL path
  
  // Use a ref to remember the previous path without causing re-renders
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    const previousPath = previousPathRef.current;
    const currentPath = location.pathname;

    // THE LOGIC: If the old path was an admin path, AND the new path is NOT...
    if (previousPath.startsWith('/admin') && !currentPath.startsWith('/admin')) {
      console.log("Navigating away from admin panel. Logging out...");
      logout();
    }

    // Always update the ref to the current path for the next navigation check
    previousPathRef.current = currentPath;

  }, [location, logout]); // This effect runs every time the URL changes

  // This renders the actual page (e.g., your AdminPage component)
  return <Outlet />;
};

export default AdminLayout;