import { config } from "dotenv";
config();

import multer from "multer";
import express from "express";
import cors from "cors";
import axios from "axios";


const app  = express();

app.use(cors());
app.use(express.json());

const PORT = 5000 || process.env.PORT;

app.get('/',(req,res) => {
    res.send("AI app is running");
})

app.listen('/',(req,res) => {
    console.log(`APP listening on PORT: ${PORT}`);
})