// /backend/server.js

// 1. Load Environment Variables IMMEDIATELY
import { config } from 'dotenv';
config();

console.log('API Key Status:', process.env.KINDWISE_API_KEY ? 'LOADED' : 'MISSING');

// 2. Import all dependencies
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import diagnosisRoutes from './routes/diagnosisRoutes.js';

// 3. Initialize the App and Config
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


// 4. Set up basic middleware
app.use(cors());
// Set JSON limit higher to accommodate large Base64 image strings
app.use(express.json({ limit: '50mb' })); 

app.use('/api/auth', authRoutes); // For /api/auth/register, /api/auth/login
app.use('/api', diagnosisRoutes);  // For /api/diagnose (if you keep the path generic)

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


// 8. Basic Test Route
app.get('/', (req, res) => {
    res.send('AI Crop Detection Backend Running!');
});


// 9. Start the connection/server sequence
connectDB();