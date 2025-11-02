import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import bcrypt from 'bcryptjs';

const userRoute = express.Router();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d', // Token expires in 1 day
    });
};

userRoute.post('/register', async (req,res) => {
    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            success : false,
            message : "All user detail not given",
        })
    }

    try{
        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.status(400).json({message:"User already exists"});
        }

        const newUser = await User.create({username,email,password});

        if(newUser){
            const token = generateToken(newUser._id);

            return res.status(201).json({
                success : true,
                message : "User registered successfully",
                user : {
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                },
                token: token,
            })
        }else{
            return res.status(400).json({message : "Invalid user data recieved"});
        }
    }catch(error){
        console.error('Registration Error:', error);
        return res.status(500).json({ message : "Server error during registration." });
    }
});

userRoute.post('/login', async (req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success : false,
            message : "Email and password are required",
        })
    }

    try{
        const userExist = await User.findOne({email:email});
        if(!userExist){
            return res.status(400).json({message:"User doesn't exists"});
        }
        
        const isMatch = await bcrypt.compare(password, userExist.password);

        if(isMatch){

            const token = generateToken(userExist._id);

            return res.status(200).json({
                success : true,
                message : "Login successful",
                user : {
                    _id: userExist._id,
                    username: userExist.username,
                    email: userExist.email,
                },
                token: token,
                
            })
        }else{
            return res.status(401).json({
                success : false,
                message : "Invalid Credentials"
            })
        }
    }catch(error){
        console.error('Login Error:', error);
        return res.status(500).json({ message : "Server error during Login." });
    }
});


export default userRoute;