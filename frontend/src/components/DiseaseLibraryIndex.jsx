import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DiseaseCard from './DiseaseCard';

const DiseaseLibraryIndex = () => {
    // Initialize loading to true since we fetch data immediately
    const [diseases, setDiseases] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); // State for user-facing errors

    const endpoint = "http://localhost:5000/api/public/disease";

    // Correct useEffect structure
    useEffect(() => {
        const fetchDiseases = async () => {
            try {
                const response = await axios.get(endpoint);
                
                if (response?.data?.data) {
                    setDiseases(response.data.data);
                    setError(null); // Clear errors on success
                }
            } catch (err) {
                console.error("Error fetching disease library:", err);
                // Set the error state for display in the return() block
                setError("Failed to load the disease library. Please try again."); 
            } finally {
                setLoading(false);
            }
        };

        fetchDiseases();
    }, []); 
    return (
        <div className="container mx-auto p-8 max-w-7xl">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-plant-gradient shadow-lg mb-6">
                    <span className="text-4xl">📚</span>
                </div>
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-plant-600 to-plant-700 bg-clip-text text-transparent mb-4">
                    Complete Disease Library Index
                </h1>
                <p className="text-plant-600 text-lg font-medium">Explore our comprehensive collection of plant diseases</p>
            </div>

            {/* 1. Conditional Rendering for Loading State */}
            {loading && (
                <div className="flex flex-col justify-center items-center h-64 glass-effect rounded-2xl border border-plant-200 shadow-plant-lg">
                    <svg className="animate-spin h-12 w-12 text-plant-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-xl text-plant-700 font-medium">Loading disease data...</p>
                </div>
            )}

            {/* 2. Conditional Rendering for Error State */}
            {error && (
                <div className="p-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm glass-effect">
                    <div className="flex items-center">
                        <span className="text-2xl mr-3">⚠️</span>
                        <div>
                            <p className="font-bold text-lg mb-1">Error:</p>
                            <p>{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 3. Conditional Rendering for No Data */}
            {!loading && diseases.length === 0 && !error && (
                <div className="text-center p-12 glass-effect rounded-2xl border border-plant-200 shadow-plant-lg">
                    <span className="text-5xl mb-4 block">🌱</span>
                    <p className="text-xl text-plant-700 font-semibold">No diseases found in the library. Please check database seeding.</p>
                </div>
            )}

            {/* 4. Display the Disease Grid */}
            {!loading && diseases.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {diseases.map((disease) => (
                        // 🚨 Assuming you create this subcomponent next
                        <DiseaseCard key={disease._id} disease={disease} /> 
                    ))}
                </div>
            )}
        </div>
    );
};

export default DiseaseLibraryIndex;
