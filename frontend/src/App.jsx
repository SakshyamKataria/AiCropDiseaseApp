import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import DiagnosisUploader from './components/DiagnosisUploader'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import ProtectedRoute from './components/ProtectedRoute'; 

// Main App Component with Routes
function App() {
    // Retrieve authentication status and user functions globally
    const { isAuthenticated, logout, user } = useAuth();
    const [isLoginView, setIsLoginView] = useState(true);

    // Simple Header/Nav component
    const Header = () => (
        <header className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full top-0 z-10">
            <h1 className="text-xl font-bold text-green-700">CropAI</h1>
            {isAuthenticated && user && ( 
                <div className="flex items-center space-x-4">
                    {/* User is guaranteed to exist here due to isAuthenticated check */}
                    <span className="text-sm text-gray-600">Logged in as: {user.username}</span>
                    <button 
                        onClick={logout} 
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            )}
        </header>
    );

    return (
        <>
            <Header />
            <main className="pt-20 min-h-screen"> 
                <Routes>
                    {/* 1. Main Protected Route: Diagnosis Uploader (Home page) */}
                    {/* The element prop renders the component returned by ProtectedRoute */}
                    <Route 
                        path="/" 
                        element={<ProtectedRoute element={DiagnosisUploader} />} 
                    />
                    
                    {/* 2. Public Auth Route: Login/Register Toggle */}
                    <Route 
                        path="/login" 
                        element={
                            // Only render the Login/Register container if the user is NOT authenticated
                            !isAuthenticated ? (
                                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                                    {isLoginView ? (
                                        <Login switchToRegister={() => setIsLoginView(false)} />
                                    ) : (
                                        <Register switchToLogin={() => setIsLoginView(true)} />
                                    )}
                                </div>
                            ) : (
                                // If authenticated and accessing /login, redirect to home
                                <Navigate to="/" />
                            )
                        } 
                    />
                    
                    {/* 3. Catch-all: Redirect any bad URL attempts */}
                    <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
                </Routes>
            </main>
        </>
    );
}

export default App;