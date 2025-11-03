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
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl">
            <h1 className="text-4xl font-extrabold text-green-800 mb-8 text-center">
                Complete Disease Library Index 📚
            </h1>

            {/* 1. Conditional Rendering for Loading State */}
            {loading && (
                <div className="flex justify-center items-center h-40">
                    <svg className="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="ml-3 text-xl text-gray-600">Loading disease data...</p>
                </div>
            )}

            {/* 2. Conditional Rendering for Error State */}
            {error && (
                <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p className="font-bold">Error:</p>
                    <p>{error}</p>
                </div>
            )}

            {/* 3. Conditional Rendering for No Data */}
            {!loading && diseases.length === 0 && !error && (
                <div className="text-center p-10 bg-yellow-50 rounded-lg">
                    <p className="text-xl text-yellow-800">No diseases found in the library. Please check database seeding.</p>
                </div>
            )}

            {/* 4. Display the Disease Grid */}
            {!loading && diseases.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
