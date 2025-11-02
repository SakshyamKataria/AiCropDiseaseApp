import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context object
const AuthContext = createContext();

// Base URL for the Express backend
const API_URL = 'http://localhost:5000/api/auth/'; 

// 2. Custom hook to use the Auth Context
export const useAuth = () => useContext(AuthContext);

// 3. The Provider Component
export const AuthProvider = ({ children }) => {
    // Initial state is loaded from localStorage if a token exists
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // --- Core Authentication Functions ---

    // 4. Register function
    const register = async (username, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(API_URL + 'register', { username, email, password });

            // Store token and user data on success
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            setToken(token);
            setUser(user);
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed due to server error.';
            setError(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // 5. Login function
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(API_URL + 'login', { email, password });

            // Store token and user data on success
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            setToken(token);
            setUser(user);
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed due to server error.';
            setError(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };
    
    // 6. Logout function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    // 7. Value provided by the context
    const value = {
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!user, // Simple boolean check
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};