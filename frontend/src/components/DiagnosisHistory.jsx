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
            <div className="flex justify-center items-center h-64">
                <svg className="animate-spin h-8 w-8 text-green-600" viewBox="0 0 24 24">...</svg>
                <p className="ml-3 text-xl text-gray-600">Loading your history...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                <p className="font-bold">Error:</p>
                <p>{error}</p>
            </div>
        );
    }
    
    if (history.length === 0) {
        return (
            <div className="text-center p-10 bg-yellow-50 rounded-lg">
                <p className="text-xl text-yellow-800 font-semibold">
                    🕰️ You have no past diagnoses recorded.
                </p>
            </div>
        );
    }

    // --- History Table Display ---
    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Diagnosis History</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-green-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Crop</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Disease Predicted</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Confidence</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">File</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {history.map((record) => (
                            <tr key={record._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {new Date(record.createdAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {record.cropName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.diseaseName.toLowerCase().includes('healthy') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {record.diseaseName}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {(record.diseaseProbability * 100).toFixed(2)}%
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {record.submittedImage}
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