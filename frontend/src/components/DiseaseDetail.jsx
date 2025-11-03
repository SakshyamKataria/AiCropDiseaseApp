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

    const disease = diseases[0];

  return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-extrabold text-green-800 mb-6 capitalize">
                Disease Details for {cropType}
            </h1>

            {loading && <p className="text-xl text-center text-gray-600">Loading details...</p>}
            
            {error && (
                <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">{error}</div>
            )}

            {!loading && diseases.length === 0 && !error && (
                <div className="text-center p-10 bg-yellow-50 rounded-lg">
                    <p className="text-xl text-yellow-800">No diseases found for "{cropType}".</p>
                </div>
            )}
            
            {/* Horizontal 50/50 Split Layout */}
            {!loading && disease && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow-lg border border-green-100">
                    
                    {/* LEFT HALF (Image) */}
                    <div className="lg:col-span-1 flex flex-col items-center">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">{disease.diseaseName}</h2>
                        <div className="w-full h-96 overflow-hidden rounded-lg shadow-xl">
                            <img 
                                src={disease.imageUrl || 'placeholder.jpg'} 
                                alt={disease.diseaseName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="mt-2 text-sm font-medium text-gray-500">Crop: {disease.cropType}</p>
                    </div>

                    {/* RIGHT HALF (Detailed Information) */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Symptoms */}
                        <div className="border-b pb-4 border-green-200">
                            <h3 className="text-xl font-bold text-green-700 flex items-center">
                                Symptoms
                            </h3>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap">{disease.symptoms}</p>
                        </div>
                        
                        {/* Cause */}
                        <div className="border-b pb-4 border-green-200">
                            <h3 className="text-xl font-bold text-green-700 flex items-center">
                                Cause
                            </h3>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap">{disease.cause}</p>
                        </div>
                        
                        {/* Prevention */}
                        <div className="border-b pb-4 border-green-200">
                            <h3 className="text-xl font-bold text-green-700 flex items-center">
                                Prevention
                            </h3>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap">{disease.prevention}</p>
                        </div>

                        {/* Treatment */}
                        <div>
                            <h3 className="text-xl font-bold text-green-700 flex items-center">
                                Treatment
                            </h3>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap">{disease.treatment}</p>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default DiseaseDetail;

