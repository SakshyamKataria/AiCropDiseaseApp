import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_ENDPOINT = "http://localhost:5000/api/history"; // ⬅️ Corrected Endpoint

const DiagnosisHistory = () => {
    // 1. State Management
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Access Token from Global State
    const { token } = useAuth(); 

    // --- Data Fetching Logic ---
    useEffect(() => {
        if (!token) {
            setError("Authentication token missing. Please log in.");
            setLoading(false);
            return;
        }

        const fetchHistory = async () => {
            try {
                // Set up the request headers with the JWT
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                
                // Securely fetch the data
                const response = await axios.get(API_ENDPOINT, config);
                
                if (response?.data?.data) {
                    setHistory(response.data.data);
                }
            } catch (err) {
                console.error("Error fetching diagnosis history:", err);
                // Handle specific 401/403 errors gracefully
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                     setError("Session expired or unauthorized. Please log in again.");
                } else {
                     setError("Failed to load history data.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [token]); // Re-run if the token changes (e.g., user logs in)

    // --- Display Logic (JSX) ---

    if (loading) {
        return (
            <div className="container mx-auto p-8 max-w-7xl">
                <div className="flex flex-col justify-center items-center h-64 glass-effect rounded-2xl border border-plant-200 shadow-plant-lg">
                    <svg className="animate-spin h-12 w-12 text-plant-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-xl text-plant-700 font-medium">Loading your history...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-8 max-w-7xl">
                <div className="p-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm glass-effect">
                    <div className="flex items-center">
                        <span className="text-2xl mr-3">⚠️</span>
                        <div>
                            <p className="font-bold text-lg mb-1">Error:</p>
                            <p>{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    if (history.length === 0) {
        return (
            <div className="container mx-auto p-8 max-w-7xl">
                <div className="text-center p-12 glass-effect rounded-2xl border border-plant-200 shadow-plant-lg">
                    <span className="text-5xl mb-4 block">🕰️</span>
                    <p className="text-xl text-plant-700 font-semibold">
                        You have no past diagnoses recorded.
                    </p>
                    <p className="text-plant-600 mt-2">Start by uploading a crop image for diagnosis!</p>
                </div>
            </div>
        );
    }

    // --- History Table Display ---
    return (
        <div className="container mx-auto p-8 max-w-7xl">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-plant-gradient shadow-lg mb-6">
                    <span className="text-4xl">⏱️</span>
                </div>
                <h2 className="text-5xl font-extrabold bg-gradient-to-r from-plant-600 to-plant-700 bg-clip-text text-transparent mb-4">
                    Your Diagnosis History
                </h2>
                <p className="text-plant-600 text-lg font-medium">View all your past crop disease diagnoses</p>
            </div>
            <div className="overflow-x-auto glass-effect rounded-2xl shadow-plant-lg border border-plant-200">
                <table className="min-w-full divide-y divide-plant-200">
                    <thead className="bg-plant-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-plant-700 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-plant-700 uppercase tracking-wider">Crop</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-plant-700 uppercase tracking-wider">Disease Predicted</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-plant-700 uppercase tracking-wider">Confidence</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-plant-700 uppercase tracking-wider">File</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-plant-200">
                        {history.map((record) => (
                            <tr key={record._id} className="hover:bg-plant-50 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-plant-800">
                                    {new Date(record.createdAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-plant-700 font-semibold">
                                    🌾 {record.cropName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full ${record.diseaseName.toLowerCase().includes('healthy') ? 'bg-plant-100 text-plant-700 border border-plant-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                                        {record.diseaseName}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1 bg-plant-200 rounded-full h-2 max-w-20">
                                            <div 
                                                className="bg-plant-gradient h-2 rounded-full" 
                                                style={{ width: `${(record.diseaseProbability * 100).toFixed(0)}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-plant-700 font-bold">{(record.diseaseProbability * 100).toFixed(2)}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-plant-600 font-medium">
                                    📎 {record.submittedImage}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DiagnosisHistory;