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
            <div className="h-1/2 p-6 border-b border-gray-200 flex items-center justify-center bg-white">
                <div className="w-full max-w-4xl h-full">
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">
                        Hello, {user?.username || 'User'}! Upload Your Crop Photo
                    </h2>
                    <DiagnosisUploader />
                </div>
            </div>

            {/* 2. BOTTOM HALF: Disease Library Controls (50% Height) */}
            <div className="h-1/2 p-6 flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-4xl h-full">
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">
                        Disease Library & History
                    </h2>
                    {/* 🚨 This component will house the two styled buttons and the filter input */}
                    <DiseaseLibraryControls /> 
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;