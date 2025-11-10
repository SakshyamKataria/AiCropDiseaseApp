import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import DiagnosisUploader from './components/DiagnosisUploader'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import MainDashboard from './components/MainDashboard';
import DiseaseLibraryIndex from './components/DiseaseLibraryIndex';
import DiseaseDetail from './components/DiseaseDetail';
import DiagnosisHistory from './components/DiagnosisHistory';
import DiseaseDetailsById from './components/DiseaseDetailById';

// Main App Component with Routes
function App() {
    // Retrieve authentication status and user functions globally
    const { isAuthenticated, logout, user } = useAuth();
    const [isLoginView, setIsLoginView] = useState(true);

    // Simple Header/Nav component
    const Header = () => (
        <header className="glass-effect border-b border-plant-200 shadow-plant p-4 flex justify-between items-center fixed w-full top-0 z-50">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-plant-gradient flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🌱</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-plant-600 to-plant-700 bg-clip-text text-transparent">
                    CropAI
                </h1>
            </div>
            {isAuthenticated && user && ( 
                <div className="flex items-center space-x-4">
                    {/* User is guaranteed to exist here due to isAuthenticated check */}
                    <div className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full bg-plant-100 border border-plant-200">
                        <span className="text-sm font-medium text-plant-700">👤 {user.username}</span>
                    </div>
                    <button 
                        onClick={logout} 
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
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
            <main className="pt-20 min-h-screen bg-gradient-to-br from-plant-50 via-green-50 to-leaf-50"> 
                <Routes>
                    {/* Protected Route for the Main Page (Diagnosis Uploader & Library Buttons) */}
                    <Route path="/" element={<ProtectedRoute element={MainDashboard} />} /> 
    
                    {/* Public/Protected Route for the Disease Library Index */}
                    <Route path="/library" element={<ProtectedRoute element={DiseaseLibraryIndex} />} />

                    {/*Route for viewing viewer history*/}
                    <Route path="/history" element={<ProtectedRoute element={DiagnosisHistory} />} />
    
                    {/* Public/Protected Route for the Filtered Disease Details */}
                    <Route path="/library/:cropType" element={<ProtectedRoute element={DiseaseDetail} />} />
                    <Route path="/library/details/:diseaseId" element={<ProtectedRoute element={DiseaseDetailsById} />} />

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
                                <div className="min-h-screen flex items-center justify-center p-4">
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