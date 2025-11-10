import React from 'react';
import { useNavigate } from 'react-router-dom';

const DiseaseCard = ({ disease }) => {
    const navigate = useNavigate();

    // 🚨 CRITICAL FIX: Use MongoDB _id for stable, unique navigation
    const handleClick = () => {
        // Navigate to the full detail page using the document's unique ID
        navigate(`/library/details/${disease._id}`); 
    };

    return (
        <div 
            // ⬅️ Aesthetics: Professional hover effect and single click target
            className="
                cursor-pointer glass-effect border-2 border-plant-200 rounded-2xl shadow-plant 
                overflow-hidden transform hover:shadow-plant-lg hover:translate-y-[-4px] 
                transition-all duration-300 hover:border-plant-300 group
            "
            onClick={handleClick} 
        >
            {/* Image Section */}
            <div className="h-56 overflow-hidden relative">
                <img 
                    src={disease.imageUrl || 'https://via.placeholder.com/600x400.png?text=Image+Not+Available'} // Use a generic placeholder link
                    alt={disease.diseaseName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plant-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Disease Name - Professional Color */}
                <h3 className="text-xl font-bold text-plant-800 mb-3 group-hover:text-plant-700 transition-colors">
                    {disease.diseaseName}
                </h3>
                
                {/* Crop Type - Green Themed Badge */}
                <div className="mb-4">
                    <span className="text-xs font-semibold inline-block bg-plant-100 text-plant-700 px-3 py-1.5 rounded-full border border-plant-200">
                        🌾 {disease.cropType}
                    </span>
                </div>

                {/* Brief Symptom Description - Using line-clamp for neatness */}
                <p className="text-plant-700 text-sm line-clamp-3 mb-5 leading-relaxed">
                    <span className="font-semibold text-plant-800">Symptoms:</span> 
                    {/* Only show the first 100 characters of symptoms */}
                    {disease.symptoms.substring(0, 100)}...
                </p>
                
                {/* View Details Link (Styled as text, relies on div's onClick) */}
                <div className="flex items-center justify-between pt-4 border-t border-plant-200">
                    <span className="text-plant-600 group-hover:text-plant-700 font-semibold text-sm flex items-center space-x-2 transition-colors">
                        <span>View Full Details</span>
                        <span className="text-lg transform group-hover:translate-x-1 transition-transform">→</span> 
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DiseaseCard;