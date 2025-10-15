import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../services/apiService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Check session storage to see if user is already logged in
  const [user, setUser] = useState(sessionStorage.getItem('user') || null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      // Create the Basic Auth token
      const token = btoa(`${username}:${password}`);
      
      // Make a test request with the token to verify credentials
      await apiClient.get('/categories', {
        headers: { 'Authorization': `Basic ${token}` }
      });

      // If successful, save user and token
      sessionStorage.setItem('user', username);
      sessionStorage.setItem('authToken', token);
      setUser(username);
      navigate('/admin');
    } catch (error) {
      // On failure, clear any old data
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('authToken');
      throw new Error('Invalid username or password');
    }
  };

  const logout = () => {
    // Clear user state and session storage
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};