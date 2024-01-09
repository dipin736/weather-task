import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    });
  
    const login = async (userData) => {
        try {
          const response = await axios.post('http://localhost:8000/api/token/', {
            username: userData.username,
            password: userData.password,
          });
    
          const token = response.data.access; 
    
          if (!token) {
            throw new Error('Token not found in response');
          }
    
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify({ username: userData.username }));
         
          setUser({ username: userData.username });
        } catch (error) {
          console.error('Error during login:', error);
      
          if (error.response && error.response.status === 401) {
         
            alert('Invalid username or password. Please try again.');
          } else {
          
            alert('An error occurred during login. Please try again later.');
          }
      
          throw new Error('Login failed');
        }
      };
    

  const register = async (userData) => {
    try {
      await axios.post('http://localhost:8000/api/register/', {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
    } catch (error) {
      console.error('Error during registration:', error);
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw new Error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
