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
        <div className="flex flex-col h-full items-center justify-center space-y-8 p-6 bg-white rounded-xl shadow-lg">
            
            {/* 1. Browse Full Library Button (Primary Action) */}
            <button
                onClick={handleFullLibrary}
                className="
                    w-full max-w-lg
                    bg-green-600 hover:bg-green-700 
                    text-white text-lg font-extrabold 
                    py-4 px-6 rounded-xl shadow-md 
                    transition duration-300 ease-in-out
                "
            >
                📚 Browse Complete Disease Library
            </button>

            <div className="w-full max-w-lg">
                <p className="text-center text-gray-600 mb-3 font-semibold">
                    — OR —
                </p>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                    Filter Library by Specific Crop Type
                </h3>

                {/* 2. Filter Input and Button Group */}
                <div className="flex space-x-3">
                    {/* Input Field */}
                    <input
                        type="text"
                        placeholder="Enter Crop Type (e.g., Corn, Tomato)"
                        value={cropInput}
                        onChange={(e) => setCropInput(e.target.value)}
                        className="
                            flex-grow 
                            p-3 border-2 border-green-300 rounded-lg 
                            focus:outline-none focus:border-green-500
                        "
                    />

                    {/* Filter Button (Secondary Action, Green Theme) */}
                    <button
                        onClick={handleFilterSubmit}
                        className="
                            bg-green-500 hover:bg-green-600 
                            text-white font-bold 
                            py-3 px-6 rounded-lg 
                            transition duration-300 ease-in-out
                            shadow-sm
                        "
                    >
                        Filter
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default DiseaseLibraryControls;