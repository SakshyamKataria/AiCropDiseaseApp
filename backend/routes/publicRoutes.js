// /backend/routes/publicRoutes.js (or similar)

import express from "express";
import DiseaseReference from "../models/DiseaseReference.js"; // Correct import name and extension

const publicRouter = express.Router();

publicRouter.get('/disease', async (req, res) => {
    
    try {
        // Mongoose query to fetch all disease documents
        const diseaseData = await DiseaseReference.find({});

        // Send a cleaner, data-focused response
        res.status(200).json({
            success: true,
            data: diseaseData // ⬅️ Use 'data' instead of 'message'
        });
        
    } catch (error) {
        console.error("Error while fetching from library: ", error); // Use console.error
        
        // Return a generic 500 error for server/DB issues
        return res.status(500).json({ 
            success: false,
            message: "Internal server error fetching disease library data."
        });
    }
});

publicRouter.get('/disease/:cropType', async (req, res) => {
    const cropType = req.params.cropType;
    try {
        // Mongoose query to fetch all disease documents
        const diseaseData = await DiseaseReference.find({ cropType });

        // Send a cleaner, data-focused response
        res.status(200).json({
            success: true,
            data: diseaseData
        });
        
    } catch (error) {
        console.error("Error while fetching from library: ", error); // Use console.error
        
        // Return a generic 500 error for server/DB issues
        return res.status(500).json({ 
            success: false,
            message: "Internal server error fetching disease library data."
        });
    }
});

export default publicRouter;