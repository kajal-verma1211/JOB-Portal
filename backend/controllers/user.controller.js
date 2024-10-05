import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export const register = async(req,res) => {
    try {
        const {fullname, email, phoneNumber, password, role}= req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
        }

        //for checking already excisting user
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"Already existing User",
                success:false
            })
        }

        //converting password in has
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        })

        return res.status(201).json({
            message: "Account craeted Successfully",
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}

//for login
export const login = async ( req, res)=>{
    console.log(req.body);
    try {
        console.log('Login request body:', req.body);
        const { email, password, role} = req.body;

        if( !email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success: false
            })
       
}

        //checking email
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Incorrect email and password",
                success:false
            })
        }

        //checking password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Incorrect email and password",
                success:false
            })
        }

        //check role is correct or not
        if(role !== user.role ){
            return res.status(400).json({
                message:"Account doesn't exist with current role",
                success: false
            })
        }

        //token generate
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

        user ={
            _id:user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({//security
            message:`Welcome back ${user.fullname}`,
            user,
            success:true
        })
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
        
    }
}

//logout
export const logout= async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logout successfully",
            success: true
        })
    } catch (error) {
        
    }
}

//update profile
export const updateProfile = async(req,res)=>{
    try {
        const {fullname,email,phoneNumber,bio, skills} = req.body;
        const file = req.file
       

        //cloudinary

        //convert sills in string to array
        let skillsArray;
        if(skills){
            const skillsArray = skills.split(",")
        }
        
        const userId = req.id; //middle ware authentication
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        }
// updating the data
       if(fullname)
        user.fullname=fullname
       if(email)
        user.email=email
       if(phoneNumber)
        user.phoneNumber=phoneNumber
       if(bio)
        user.profile.bio=bio
       if(skills)
        user.profile.skills=skillsArray
        

        //resume

        await user.save();

        user ={
            _id:user._id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully ",
            user,
            success:true
        })

    } catch (error) {
        console.error('Login error:', error); // Log the error for debugging
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
    }
}