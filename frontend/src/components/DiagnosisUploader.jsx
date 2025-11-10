import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const DiagnosisUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [diagnosisResult, setDiagnosisResult] = useState(null);
    const [error, setError] = useState(null); // Added state for error messages
    const { token } = useAuth();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setDiagnosisResult(null); // Clear previous results on new file selection
        setError(null);           // Clear previous errors
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select an image file to upload.");
            return;
        }

        setLoading(true);
        setError(null); // Clear previous errors before a new attempt

        const formData = new FormData();
        formData.append('plantImage', selectedFile);

        try {
            // Corrected URL to http (for local development)
            const response = await axios.post(
                'http://localhost:5000/api/diagnose', 
                formData,
                {
                    headers: {
                        // ⬅️ CRITICAL: Send the JWT for the protected route
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'multipart/form-data', 
                    }
                }
            );
            setDiagnosisResult(response.data.diagnosis);
            setSelectedFile(null); // Clear selected file after successful upload
        } catch (err) {
            console.error("Upload failed:", err);
            // More specific error handling for user feedback
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred during diagnosis. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
                    🌿 Plant Disease Diagnoser
                </h2>

                {/* File Input */}
                <div className="mb-6">
                    <label 
                        htmlFor="plant-image-upload" 
                        className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                        Upload Plant Image:
                    </label>
                    <input
                        id="plant-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-green-50 file:text-green-700
                            hover:file:bg-green-100"
                    />
                    {selectedFile && (
                        <p className="mt-2 text-sm text-gray-600">
                            Selected: <span className="font-medium">{selectedFile.name}</span>
                        </p>
                    )}
                </div>

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    disabled={loading || !selectedFile}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg
                        focus:outline-none focus:shadow-outline transition duration-200 ease-in-out
                        disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </span>
                    ) : (
                        'Diagnose Crop Disease'
                    )}
                </button>

                {/* Error Display */}
                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <p className="font-bold">Error:</p>
                        <p>{error}</p>
                    </div>
                )}

                {/* Diagnosis Results */}
                {diagnosisResult && (
                    <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-green-800 mb-3">
                            ✅ Diagnosis Report
                        </h3>
                        <p className="text-gray-700 mb-2">
                            <strong className="text-green-700">Image:</strong> {diagnosisResult.submittedImage}
                        </p>
                        <hr className="my-3 border-green-200" />
                        
                        <h4 className="text-xl font-medium text-green-800 mb-2">Identified Crop:</h4>
                        <p className="text-gray-700">
                            <strong className="text-green-700">Name:</strong> {diagnosisResult.cropName}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                            className="bg-green-500 h-2.5 rounded-full" 
                            style={{ width: `${(diagnosisResult.diseaseProbability * 100).toFixed(0)}%` }}
                        ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            Confidence: {(diagnosisResult.diseaseProbability * 100).toFixed(2)}%
                        </p>
                        
                        <h4 className="text-xl font-medium text-green-800 mb-2">Disease Prediction:</h4>
                        <p className="text-gray-700">
                            <strong className="text-green-700">Name:</strong> {diagnosisResult.diseaseName}
                        </p>
                        <p className="text-gray-700">
                            <strong className="text-green-700">Confidence:</strong> {(diagnosisResult.diseaseProbability * 100).toFixed(2)}%
                        </p>

                        {/* You can expand this to show fullResponse details like treatment, etc. */}
                        {diagnosisResult.fullResponse && diagnosisResult.fullResponse.result.disease.suggestions[0].details && (
                            <div className="mt-4">
                                <h5 className="text-lg font-medium text-green-800">Further Details:</h5>
                                <p className="text-gray-700">
                                    {diagnosisResult.fullResponse.result.disease.suggestions[0].details.description || 'No detailed description available.'}
                                </p>
                                // Add more details as needed
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
};

export default DiagnosisUploader;