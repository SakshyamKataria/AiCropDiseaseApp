import React from 'react';
import { useAuth } from '../context/AuthContext';
// 🚨 You must create and import these two components
import DiagnosisUploader from './DiagnosisUploader';
import DiseaseLibraryControls from './DiseaseLibraryControls'; 

const MainDashboard = () => {
    // We access the user object here, though not strictly needed for the layout, 
    // it confirms the component is properly within the AuthContext.
    const { user } = useAuth(); 

    return (
        // Outer wrapper for the content, ensuring it fills the screen (minus header padding)
        <div className="flex flex-col min-h-[calc(100vh-5rem)] w-full"> 
            
            {/* 1. TOP HALF: Diagnosis Uploader (50% Height) */}
            <div className="h-1/2 p-8 border-b border-plant-200 flex items-center justify-center bg-gradient-to-br from-white to-plant-50">
                <div className="w-full max-w-5xl h-full flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-plant-600 to-plant-700 bg-clip-text text-transparent mb-2">
                            🌿 Hello, {user?.username || 'User'}!
                        </h2>
                        <p className="text-plant-600 font-medium">Upload your crop photo for AI-powered disease diagnosis</p>
                    </div>
                    <DiagnosisUploader />
                </div>
            </div>

            {/* 2. BOTTOM HALF: Disease Library Controls (50% Height) */}
            <div className="h-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-plant-50 to-white">
                <div className="w-full max-w-5xl h-full flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-plant-600 to-plant-700 bg-clip-text text-transparent mb-2">
                            📚 Disease Library & History
                        </h2>
                        <p className="text-plant-600 font-medium">Explore our comprehensive disease database</p>
                    </div>
                    {/* 🚨 This component will house the two styled buttons and the filter input */}
                    <DiseaseLibraryControls /> 
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;