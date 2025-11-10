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
        <div className="w-full">
            <div className="glass-effect p-8 rounded-2xl shadow-plant-lg w-full max-w-2xl mx-auto border border-plant-200">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-plant-gradient shadow-lg mb-4">
                        <span className="text-4xl">🌿</span>
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-plant-600 to-plant-700 bg-clip-text text-transparent mb-2">
                        Plant Disease Diagnoser
                    </h2>
                    <p className="text-plant-600 text-sm font-medium">Upload an image to get instant AI diagnosis</p>
                </div>

                {/* File Input */}
                <div className="mb-6">
                    <label 
                        htmlFor="plant-image-upload" 
                        className="block text-plant-700 text-sm font-semibold mb-3"
                    >
                        Upload Plant Image
                    </label>
                    <div className="relative">
                        <input
                            id="plant-image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-3 file:px-6
                                file:rounded-xl file:border-0
                                file:text-sm file:font-semibold
                                file:bg-plant-100 file:text-plant-700
                                hover:file:bg-plant-200 file:transition-all file:duration-200
                                file:cursor-pointer file:shadow-sm"
                        />
                    </div>
                    {selectedFile && (
                        <div className="mt-3 p-3 bg-plant-50 border border-plant-200 rounded-lg">
                            <p className="text-sm text-plant-700">
                                <span className="font-semibold">📎 Selected:</span> <span className="font-medium">{selectedFile.name}</span>
                            </p>
                        </div>
                    )}
                </div>

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    disabled={loading || !selectedFile}
                    className="w-full plant-gradient hover:from-plant-600 hover:to-plant-700 text-white font-bold py-4 px-6 rounded-xl
                        focus:outline-none focus:ring-2 focus:ring-plant-500 focus:ring-offset-2 transition-all duration-300 ease-in-out
                        disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-plant-lg transform hover:scale-[1.02]"
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
                        <span className="flex items-center justify-center">
                            <span className="mr-2">🔍</span>
                            Diagnose Crop Disease
                        </span>
                    )}
                </button>

                {/* Error Display */}
                {error && (
                    <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm">
                        <div className="flex items-start">
                            <span className="text-xl mr-2">⚠️</span>
                            <div>
                                <p className="font-bold mb-1">Error:</p>
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Diagnosis Results */}
                {diagnosisResult && (
                    <div className="mt-6 p-6 bg-gradient-to-br from-plant-50 to-plant-100 border-2 border-plant-300 rounded-2xl shadow-plant-lg">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-plant-500 flex items-center justify-center mr-3 shadow-lg">
                                <span className="text-2xl">✅</span>
                            </div>
                            <h3 className="text-2xl font-bold text-plant-800">
                                Diagnosis Report
                            </h3>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="p-3 bg-white rounded-lg border border-plant-200">
                                <p className="text-sm text-plant-600 mb-1">Image File</p>
                                <p className="text-plant-800 font-semibold">{diagnosisResult.submittedImage}</p>
                            </div>
                            
                            <div className="p-4 bg-white rounded-lg border border-plant-200">
                                <h4 className="text-lg font-bold text-plant-700 mb-3 flex items-center">
                                    <span className="mr-2">🌾</span>
                                    Identified Crop
                                </h4>
                                <p className="text-plant-800 font-semibold text-xl mb-3">{diagnosisResult.cropName}</p>
                                <div className="w-full bg-plant-200 rounded-full h-3 mt-2">
                                    <div 
                                        className="bg-plant-gradient h-3 rounded-full transition-all duration-500" 
                                        style={{ width: `${(diagnosisResult.diseaseProbability * 100).toFixed(0)}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-plant-600 mt-2 font-medium">
                                    Confidence: <span className="font-bold text-plant-700">{(diagnosisResult.diseaseProbability * 100).toFixed(2)}%</span>
                                </p>
                            </div>
                            
                            <div className="p-4 bg-white rounded-lg border border-plant-200">
                                <h4 className="text-lg font-bold text-plant-700 mb-3 flex items-center">
                                    <span className="mr-2">🔬</span>
                                    Disease Prediction
                                </h4>
                                <p className="text-plant-800 font-semibold text-xl mb-2">{diagnosisResult.diseaseName}</p>
                                <div className="flex items-center space-x-2">
                                    <div className="flex-1 bg-plant-200 rounded-full h-2">
                                        <div 
                                            className="bg-plant-gradient h-2 rounded-full" 
                                            style={{ width: `${(diagnosisResult.diseaseProbability * 100).toFixed(0)}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-bold text-plant-700">{(diagnosisResult.diseaseProbability * 100).toFixed(2)}%</span>
                                </div>
                            </div>

                            {/* You can expand this to show fullResponse details like treatment, etc. */}
                            {diagnosisResult.fullResponse && diagnosisResult.fullResponse.result.disease.suggestions[0].details && (
                                <div className="p-4 bg-white rounded-lg border border-plant-200">
                                    <h5 className="text-lg font-bold text-plant-700 mb-2 flex items-center">
                                        <span className="mr-2">📋</span>
                                        Further Details
                                    </h5>
                                    <p className="text-plant-700 leading-relaxed">
                                        {diagnosisResult.fullResponse.result.disease.suggestions[0].details.description || 'No detailed description available.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiagnosisUploader;