import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DiseaseDetailById = () => {
    // 1. Parameter and State Setup
    const { diseaseId } = useParams(); // Get the ID from the URL
    const [disease, setDisease] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    // Endpoint uses the new backend route
    const endpoint = `http://localhost:5000/api/public/disease/details/${diseaseId}`;

    // 2. Data Fetching (runs whenever the diseaseId changes)
    useEffect(() => {
        const fetchDisease = async () => {
            setLoading(true);
            try {
                const response = await axios.get(endpoint);
                
                if (response?.data?.data) {
                    setDisease(response.data.data);
                    setError(null);
                } else {
                    setError("Disease record not found.");
                }
            } catch (err) {
                console.error("Error fetching disease details:", err);
                setError("Failed to load the disease details due to a server error."); 
            } finally {
                setLoading(false);
            }
        };

        fetchDisease();
    }, [diseaseId, endpoint]); // Dependency on diseaseId ensures data integrity

    // 3. Conditional Render States
    if (loading) {
        return <div className="text-center p-8 text-xl text-gray-500">Loading disease details...</div>;
    }

    if (error || !disease) {
        return (
            <div className="p-8 text-center">
                <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p className="font-bold">Error:</p>
                    <p>{error || "Record not available."}</p>
                </div>
            </div>
        );
    }
    
    // 4. Final Layout (50/50 Horizontal Split)
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8">{disease.diseaseName}</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-2xl border border-green-100">
                
                {/* LEFT HALF (Image Display) */}
                <div className="lg:col-span-1 flex flex-col items-center">
                    <p className="text-xl font-medium text-green-700 mb-4">Affected Crop: {disease.cropType}</p>
                    <div className="w-full h-96 overflow-hidden rounded-lg shadow-xl border border-green-200">
                        <img 
                            src={disease.imageUrl || 'https://via.placeholder.com/600x400.png?text=Image+Not+Available'} 
                            alt={disease.diseaseName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* RIGHT HALF (Detailed Information) */}
                <div className="lg:col-span-1 space-y-6">
                    
                    {/* Symptoms */}
                    <div className="border-b pb-4 border-green-200">
                        <h3 className="text-xl font-bold text-green-700">Symptoms</h3>
                        <p className="mt-2 text-gray-700 whitespace-pre-wrap">{disease.symptoms}</p>
                    </div>
                    
                    {/* Cause */}
                    <div className="border-b pb-4 border-green-200">
                        <h3 className="text-xl font-bold text-green-700">Cause</h3>
                        <p className="mt-2 text-gray-700 whitespace-pre-wrap">{disease.cause}</p>
                    </div>
                    
                    {/* Prevention */}
                    <div className="border-b pb-4 border-green-200">
                        <h3 className="text-xl font-bold text-green-700">Prevention</h3>
                        <p className="mt-2 text-gray-700 whitespace-pre-wrap">{disease.prevention}</p>
                    </div>

                    {/* Treatment */}
                    <div>
                        <h3 className="text-xl font-bold text-green-700">Treatment</h3>
                        <p className="mt-2 text-gray-700 whitespace-pre-wrap">{disease.treatment}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiseaseDetailById;