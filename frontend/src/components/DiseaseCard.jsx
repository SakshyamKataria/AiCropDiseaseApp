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
                cursor-pointer bg-white border border-gray-200 rounded-xl shadow-lg 
                overflow-hidden transform hover:shadow-xl hover:translate-y-[-2px] 
                transition duration-300
            "
            onClick={handleClick} 
        >
            {/* Image Section */}
            <div className="h-48 overflow-hidden">
                <img 
                    src={disease.imageUrl || 'https://via.placeholder.com/600x400.png?text=Image+Not+Available'} // Use a generic placeholder link
                    alt={disease.diseaseName}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Disease Name - Professional Color */}
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {disease.diseaseName}
                </h3>
                
                {/* Crop Type - Green Themed Badge */}
                <p className="text-sm font-semibold inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full mb-3">
                    Crop: {disease.cropType}
                </p>

                {/* Brief Symptom Description - Using line-clamp for neatness */}
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    <span className="font-medium text-gray-800">Symptoms:</span> 
                    {/* Only show the first 100 characters of symptoms */}
                    {disease.symptoms.substring(0, 100)}...
                </p>
                
                {/* View Details Link (Styled as text, relies on div's onClick) */}
                <p className="text-green-600 hover:text-green-800 font-semibold mt-3 text-sm flex items-center space-x-1">
                    <span>View Full Details</span>
                    <span className="text-xl">→</span> 
                </p>
            </div>
        </div>
    );
};

export default DiseaseCard;