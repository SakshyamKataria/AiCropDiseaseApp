// /backend/models/Diagnosis.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const DiagnosisSchema = new Schema(
    {
        // User Association (Optional)
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User', 
            required: false, 
        },

        // Image Identification Reference
        submittedImage: {
            type: String, // Stores the original filename
            required: true,
        },

        // Primary Crop Prediction (from result->crop->suggestions[0])
        cropName: {
            type: String, 
            required: true,
        },
        cropProbability: {
            type: Number, 
            required: true,
        },

        // Primary Disease Prediction (from result->disease->suggestions[0])
        diseaseName: {
            type: String, // e.g., "Healthy" or "Potato late blight"
            required: true,
        },
        diseaseProbability: {
            type: Number, 
            required: true,
        },

        // Full API Data (Crucial for storing all raw details like treatment and links)
        fullResponse: {
            type: Schema.Types.Mixed, // Allows storage of the entire flexible JSON object
            required: true,
        },
    },
    {
        // Automatically adds createdAt and updatedAt fields
        timestamps: true,
    }
);

const Diagnosis = mongoose.model('Diagnosis', DiagnosisSchema);

export default Diagnosis;