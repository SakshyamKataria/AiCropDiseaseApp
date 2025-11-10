import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DiseaseDetail = () => {
    
    const [diseases, setDiseases] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    const {cropType} = useParams();

    const endpoint = `http://localhost:5000/api/public/disease/${cropType}`;

    useEffect( () => {
        const fetchDiseases = async () => {
            try {
                const response = await axios.get(endpoint);
                
                if (response?.data?.data) {
                    setDiseases(response.data.data);
                    setError(null); // Clear errors on success
                }
            } catch (err) {
                console.error("Error fetching disease :", err);
                // Set the error state for display in the return() block
                setError("Failed to load the disease. Please try again."); 
            } finally {
                setLoading(false);
            }
        };

        fetchDiseases();
    },[cropType,endpoint]);

  return (
        <div className="container mx-auto p-8 max-w-7xl">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-plant-gradient shadow-lg mb-6">
                    <span className="text-4xl">🌾</span>
                </div>
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-plant-600 to-plant-700 bg-clip-text text-transparent mb-4 capitalize">
                    Disease Details for {cropType}
                </h1>
                <p className="text-plant-600 text-lg font-medium">
                    {diseases.length > 0 ? `Found ${diseases.length} disease${diseases.length > 1 ? 's' : ''}` : 'Comprehensive information about crop diseases'}
                </p>
            </div>

            {loading && (
                <div className="flex flex-col justify-center items-center h-64 glass-effect rounded-2xl border border-plant-200 shadow-plant-lg">
                    <svg className="animate-spin h-12 w-12 text-plant-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-xl text-plant-700 font-medium">Loading details...</p>
                </div>
            )}
            
            {error && (
                <div className="p-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm glass-effect">
                    <div className="flex items-center">
                        <span className="text-2xl mr-3">⚠️</span>
                        <p className="font-bold text-lg">{error}</p>
                    </div>
                </div>
            )}

            {!loading && diseases.length === 0 && !error && (
                <div className="text-center p-12 glass-effect rounded-2xl border border-plant-200 shadow-plant-lg">
                    <span className="text-5xl mb-4 block">🌱</span>
                    <p className="text-xl text-plant-700 font-semibold">No diseases found for "{cropType}".</p>
                </div>
            )}
            
            {/* Display all matching diseases */}
            {!loading && diseases.length > 0 && (
                <div className="space-y-8">
                    {diseases.map((disease, index) => (
                        <div key={disease._id || index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 glass-effect p-8 rounded-2xl shadow-plant-lg border border-plant-200">
                            
                            {/* LEFT HALF (Image) */}
                            <div className="lg:col-span-1 flex flex-col items-center">
                                <div className="w-full mb-6">
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-plant-600 to-plant-700 bg-clip-text text-transparent mb-2 text-center">
                                        {disease.diseaseName}
                                    </h2>
                                    <div className="text-center">
                                        <span className="inline-block bg-plant-100 text-plant-700 px-4 py-2 rounded-full text-sm font-semibold border border-plant-200">
                                            🌾 {disease.cropType}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full h-96 overflow-hidden rounded-2xl shadow-plant-lg border-2 border-plant-200">
                                    <img 
                                        src={disease.imageUrl || 'placeholder.jpg'} 
                                        alt={disease.diseaseName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* RIGHT HALF (Detailed Information) */}
                            <div className="lg:col-span-1 space-y-6">
                                
                                {/* Symptoms */}
                                <div className="p-5 bg-white rounded-xl border border-plant-200 shadow-sm">
                                    <h3 className="text-xl font-bold text-plant-700 flex items-center mb-3">
                                        <span className="mr-2">🔍</span>
                                        Symptoms
                                    </h3>
                                    <p className="text-plant-700 leading-relaxed whitespace-pre-wrap">{disease.symptoms}</p>
                                </div>
                                
                                {/* Cause */}
                                <div className="p-5 bg-white rounded-xl border border-plant-200 shadow-sm">
                                    <h3 className="text-xl font-bold text-plant-700 flex items-center mb-3">
                                        <span className="mr-2">🔬</span>
                                        Cause
                                    </h3>
                                    <p className="text-plant-700 leading-relaxed whitespace-pre-wrap">{disease.cause}</p>
                                </div>
                                
                                {/* Prevention */}
                                <div className="p-5 bg-white rounded-xl border border-plant-200 shadow-sm">
                                    <h3 className="text-xl font-bold text-plant-700 flex items-center mb-3">
                                        <span className="mr-2">🛡️</span>
                                        Prevention
                                    </h3>
                                    <p className="text-plant-700 leading-relaxed whitespace-pre-wrap">{disease.prevention}</p>
                                </div>

                                {/* Treatment */}
                                <div className="p-5 bg-white rounded-xl border border-plant-200 shadow-sm">
                                    <h3 className="text-xl font-bold text-plant-700 flex items-center mb-3">
                                        <span className="mr-2">💊</span>
                                        Treatment
                                    </h3>
                                    <p className="text-plant-700 leading-relaxed whitespace-pre-wrap">{disease.treatment}</p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DiseaseDetail;

