import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage when the AuthProvider mounts
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('sUserId');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    
    if (storedLoginStatus === 'true') {
      setAuthenticated(true);
      setUserId(storedUserId);
    }
    if (storedIsAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.get('http://localhost:5050/get', { params: { email } });
      const userData = response.data;

      if (userData.email === email && userData.password === password) {
        setAuthenticated(true);
        setUserId(email);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('sUserId', email);
        localStorage.setItem('password', password);

        if (userData.role === 'user') {
          setIsAdmin(false);
          navigate('/');
        } else {
          setIsAdmin(true);
          localStorage.setItem('isAdmin', 'true');
          navigate('/admin');
        }
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Re-throw the error to be caught in the SignIn component
    }
  };

  const logout = () => {
    setAuthenticated(false);
    setUserId('');
    setIsAdmin(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, userId, setUserId, isAdmin, setIsAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);