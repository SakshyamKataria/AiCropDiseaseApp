import { config } from "dotenv";
config();

import multer from "multer";
import express from "express";
import cors from "cors";
import axios from "axios";
import mongoose from "mongoose";


const app  = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI);

        app.listen(PORT,(req,res) => {
            console.log(`APP listening on PORT: ${PORT}`);
        })

    }catch(error){
    console.log(`connection failed: ${error}`);
    process.exit(1);
    }
}



app.get('/',(req,res) => {
    res.send("AI app is running");
})

connectDB();