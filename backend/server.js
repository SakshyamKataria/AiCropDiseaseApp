// /backend/server.js

// 1. Load Environment Variables IMMEDIATELY
import { config } from 'dotenv';
config();

// 2. Import all dependencies
import express from 'express';
import cors from 'cors';
import multer from 'multer'; 
import axios from 'axios';
import mongoose from 'mongoose';
import Diagnosis from './models/Diagnosis.js'; // Import your updated Mongoose model

// 3. Initialize the App and Config
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Kindwise API Configuration
const KINDWISE_API_KEY = process.env.KINDWISE_API_KEY;
const KINDWISE_ENDPOINT = 'https://crop.kindwise.com/api/v1/identification'; 

// 4. Set up basic middleware
app.use(cors());
// Set JSON limit higher to accommodate large Base64 image strings
app.use(express.json({ limit: '50mb' })); 

// 5. Multer setup (using memoryStorage to get the image as a Buffer)
const upload = multer({ storage: multer.memoryStorage() });


// 6. Mongoose Connection Logic
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`\nMongoDB Connected Successfully!`);
        
        // If successful, start the Express server
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
            console.log('Backend environment initialized.');
        });

    } catch (error) {
        console.error(`\n🔴 Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};


// 7. AI PROXY ROUTE: Receives file, converts to Base64, and proxies to Kindwise
app.post('/api/diagnose', upload.single('plantImage'), async (req, res) => {
    
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No image file uploaded." });
    }

    try {
        const imageBuffer = req.file.buffer;
        
        // 🔴 Convert image Buffer to Base64 string for Kindwise JSON API
        const base64Image = imageBuffer.toString('base64');
        
        // 1. Construct the JSON request body for Kindwise
        const kindwiseBody = {
            images: [`data:${req.file.mimetype};base64,${base64Image}`],
            // language: 'en',
            // async: false
        };

        // 2. Make the External API Call (Proxy)
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

        // 3. Extract and Save to MongoDB (Parsing the Kindwise response structure)
        const topCrop = apiData.result.crop.suggestions[0];
        const topDisease = apiData.result.disease.suggestions[0];
        
        const newDiagnosis = new Diagnosis({
            submittedImage: req.file.originalname, 
            
            // Crop Details
            cropName: topCrop.name, 
            cropProbability: topCrop.probability, 

            // Disease Details
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
        console.error("🔴 AI Proxy or Database Error:", error.message);
        
        // Detailed error response from external API
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


// 8. Basic Test Route
app.get('/', (req, res) => {
    res.send('AI Crop Detection Backend Running!');
});


// 9. Start the connection/server sequence
connectDB();