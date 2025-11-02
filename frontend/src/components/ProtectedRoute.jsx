import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Access the global state

// Component to handle route protection (RRD v6 pattern)
// It accepts the component to render via the 'element' prop
const ProtectedRoute = ({ element: Component}) => {
    // Get auth state from global context
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        // Show loading state while checking the token/session status
        return <div className="text-center p-8 text-xl text-gray-500">Loading session...</div>;
    }

    // RRD v6: If authenticated, render the passed component. 
    // Otherwise, redirect to /login.
    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;