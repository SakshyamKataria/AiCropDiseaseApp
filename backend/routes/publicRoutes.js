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

publicRouter.get('/disease/details/:id', async (req, res) => {
    // 1. Extract the ID from the URL parameter
    const diseaseId = req.params.id;

    // 2. Simple validation check
    if (!diseaseId) {
        return res.status(400).json({ success: false, message: "Disease ID is required for details." });
    }

    try {
        // 3. Mongoose query to find ONE document by its primary key
        const diseaseData = await DiseaseReference.findById(diseaseId);

        if (!diseaseData) {
            return res.status(404).json({ success: false, message: "Disease not found." });
        }

        // 4. Send the single document back
        res.status(200).json({
            success: true,
            data: diseaseData
        });
        
    } catch (error) {
        // Log the error and send a generic server error response
        console.error("Error while fetching single disease document:", error);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error fetching disease details."
        });
    }
});

export default publicRouter;