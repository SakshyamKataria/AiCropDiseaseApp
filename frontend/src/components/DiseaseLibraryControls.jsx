import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DiseaseLibraryControls = () => {
    const [cropInput, setCropInput] = useState('');
    const navigate = useNavigate();

    // --- Button 1 Handler: Navigate to Full Library ---
    const handleFullLibrary = () => {
        // Navigate to the route that lists ALL diseases
        navigate('/library');
    };

    // --- Button 2 Handler: Filter by Crop Type ---
    const handleFilterSubmit = () => {
        const cleanCrop = cropInput.toLowerCase().trim();

        if (cleanCrop) {
            // Navigate to the parameterized route: /library/corn, /library/tomato, etc.
            navigate(`/library/${cleanCrop}`);
            setCropInput(''); // Clear the input after navigating
        } else {
            // Optionally, show a small error/toast notification here
            alert("Please enter a crop type to filter!");
        }
    };

    return (
        <div className="flex flex-col h-full items-center justify-center space-y-8 p-8 glass-effect rounded-2xl shadow-plant-lg border border-plant-200 max-w-2xl mx-auto">
            
            {/* 1. Browse Full Library Button (Primary Action) */}
            <button
                onClick={handleFullLibrary}
                className="
                    w-full
                    plant-gradient hover:from-plant-600 hover:to-plant-700 
                    text-white text-lg font-bold 
                    py-5 px-8 rounded-xl shadow-lg hover:shadow-plant-lg
                    transition-all duration-300 ease-in-out
                    transform hover:scale-[1.02] flex items-center justify-center space-x-2
                "
            >
                <span className="text-2xl">📚</span>
                <span>Browse Complete Disease Library</span>
            </button>

            <div className="w-full space-y-6">
                <div className="flex items-center justify-center space-x-4">
                    <div className="flex-1 h-px bg-plant-200"></div>
                    <p className="text-center text-plant-600 font-semibold px-4">
                        OR
                    </p>
                    <div className="flex-1 h-px bg-plant-200"></div>
                </div>
                
                <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-plant-700 mb-2">
                        Filter by Crop Type
                    </h3>
                    <p className="text-sm text-plant-600">Search for diseases affecting a specific crop</p>
                </div>

                {/* 2. Filter Input and Button Group */}
                <div className="flex space-x-3">
                    {/* Input Field */}
                    <input
                        type="text"
                        placeholder="Enter Crop Type (e.g., Corn, Tomato)"
                        value={cropInput}
                        onChange={(e) => setCropInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleFilterSubmit()}
                        className="
                            flex-grow 
                            p-4 border-2 border-plant-200 rounded-xl 
                            focus:outline-none focus:ring-2 focus:ring-plant-500 focus:border-plant-500
                            bg-white text-plant-800 placeholder-plant-400
                            transition-all duration-200
                        "
                    />

                    {/* Filter Button (Secondary Action, Green Theme) */}
                    <button
                        onClick={handleFilterSubmit}
                        className="
                            bg-plant-500 hover:bg-plant-600 
                            text-white font-bold 
                            py-4 px-8 rounded-xl 
                            transition-all duration-300 ease-in-out
                            shadow-md hover:shadow-lg transform hover:scale-105
                        "
                    >
                        🔍 Filter
                    </button>
                </div>
                
                {/* NEW: Diagnosis History Button */}
                <button
                    onClick={() => navigate('/history')}
                    className="
                        w-full
                        bg-gradient-to-r from-plant-400 to-plant-500 hover:from-plant-500 hover:to-plant-600
                        text-white text-lg font-bold 
                        py-5 px-8 rounded-xl shadow-lg hover:shadow-plant-lg
                        transition-all duration-300 ease-in-out
                        transform hover:scale-[1.02] flex items-center justify-center space-x-2
                    "
                >
                    <span className="text-2xl">⏱️</span>
                    <span>View Diagnosis History</span>
                </button>
            </div>
            
        </div>
    );
};

export default DiseaseLibraryControls;