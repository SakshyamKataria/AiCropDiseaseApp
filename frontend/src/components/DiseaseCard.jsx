import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate if you want the card to be clickable

const DiseaseCard = ({ disease }) => {
    const navigate = useNavigate();

    // Function to handle click and navigate to the full detail page (Optional)
    const handleClick = () => {
        // Navigate to a dedicated detail route, perhaps using the disease's unique ID or name
        navigate(`/library/details/${disease.diseaseName}`); 
    };

    return (
        <div 
            className="cursor-pointer bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition duration-300" // Uncomment this if making the card clickable
            onClick={handleClick} 
        >
            {/* Image Section */}
            <div className="h-48 overflow-hidden">
                <img 
                    src={disease.imageUrl || 'placeholder.jpg'} // Use the imageUrl field
                    alt={disease.diseaseName}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Disease Name */}
                <h3 className="text-xl font-bold text-green-700 mb-1">
                    {disease.diseaseName}
                </h3>
                
                {/* Crop Type (Using a Tailwind Badge/Pill style) */}
                <p className="text-sm font-semibold inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full mb-3">
                    Crop: {disease.cropType}
                </p>

                {/* Brief Symptom Description (Truncated) */}
                <p className="text-gray-600 text-sm line-clamp-3">
                    <span className="font-medium text-gray-800">Symptoms:</span> {disease.symptoms.substring(0, 100)}...
                </p>
                
                {/* Read More Link (Optional) */}
                <button 
                    onClick={handleClick} // Link to a detail page
                    className="text-green-600 hover:text-green-800 font-semibold mt-3 text-sm"
                >
                    View Details →
                </button>
            </div>
        </div>
    );
};

export default DiseaseCard;