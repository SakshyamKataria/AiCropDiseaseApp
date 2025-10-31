// /backend/routes/diagnosisRoutes.js

import express from 'express';
import axios from 'axios';
import Diagnosis from '../models/Diagnosis.js'; // Correct relative path
import multer from 'multer'; 

const router = express.Router();

// Define constants using process.env (assuming they are loaded in server.js)
const KINDWISE_API_KEY = process.env.KINDWISE_API_KEY;
const KINDWISE_ENDPOINT = 'https://crop.kindwise.com/api/v1/identification'; 

// Multer setup (using memoryStorage to get the image as a Buffer)
const upload = multer({ storage: multer.memoryStorage() });

// Corrected route path: removed /api/diagnose prefix, now just /diagnose
router.post('/diagnose', upload.single('plantImage'), async (req, res) => { 
    
    // NOTE: MongoDB/Mongoose is not imported here as it's typically set up globally in server.js
    // We assume the Diagnosis model is ready to use.

    if (!req.file) {
        return res.status(400).json({ success: false, message: "No image file uploaded." });
    }

    try {
        const imageBuffer = req.file.buffer;
        const base64Image = imageBuffer.toString('base64');
        
        // Minimal Kindwise Body - based on successful Postman test
        const kindwiseBody = {
            images: [`data:${req.file.mimetype};base64,${base64Image}`],
        };

        // ... (axios post request)
        const aiResponse = await axios.post(
            KINDWISE_ENDPOINT,
            kindwiseBody,
            {
                headers: {
                    'Api-Key': KINDWISE_API_KEY, 
                    'Content-Type': 'application/json',
                },
            }
        );

        const apiData = aiResponse.data;

        // 3. Extract and Save to MongoDB
        const topCrop = apiData.result.crop.suggestions[0];
        const topDisease = apiData.result.disease.suggestions[0];
        
        // 🚨 IMPORTANT: You must ensure the user field is populated later! 
        // For now, we skip the user link until login is implemented.
        
        const newDiagnosis = new Diagnosis({
            submittedImage: req.file.originalname, 
            
            // Crop Details
            cropName: topCrop.name, 
            cropProbability: topCrop.probability, 

            // Disease Details
            // Use topDisease for both name/probability, as confirmed by the output structure
            diseaseName: topDisease.name, 
            diseaseProbability: topDisease.probability, 

            fullResponse: apiData, 
        });

        await newDiagnosis.save();
        
        // 4. Send the result back to the React client
        res.status(200).json({ 
            success: true, 
            diagnosis: newDiagnosis,
            aiResult: apiData 
        });

    } catch (error) {
        // ... (Error handling is correct)
        console.error("🔴 AI Proxy or Database Error:", error.message);
        
        if (error.response && error.response.data) {
             return res.status(500).json({ 
                success: false, 
                message: "External AI API Error", 
                details: error.response.data 
            });
        }
        
        res.status(500).json({ success: false, message: "Server encountered a general error." });
    }
});

export default router;