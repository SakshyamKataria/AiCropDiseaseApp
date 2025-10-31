import express from 'express';
import jwt from 'jsonwebtoken';

const userRoute = express.Router();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d', // Token expires in 1 day
    });
};

userRoute.post('/register',(req,res) => {
    const {name,email,password} = req.body;
})