import Jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

// auth,is_student,is_admin

const Auth = (req,res,next)=>{
    try {
        console.log("cookie",req.cookies.token)
        console.log("body",req.body.token)
        console.log("header",req.header("Authorization"))

        // extract token
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","")
        if (!token) {
            res.status(404).json({
                success:false,
                message:"Token is missing"
            });
        }
        // verify token
        try {
            const decode = Jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode)
            req.user = decode
        } catch (error) {
            res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }
        next()

        
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"something wrong while verifiying the token"
        })
    }
}


const isStudent = (req,res,next)=>{
    try {
        
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success:false,
                message:"This is protected route for student"
            })
        }
        next()

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}

const isAdmin = (req,res,next)=>{
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin"
            })
        }
        next()
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}



export {Auth,isStudent,isAdmin}