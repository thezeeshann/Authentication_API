import express from "express";
import SignupControllers from "../controllers/SignupControllers.js";
import LoginControllers from "../controllers/LoginControllers.js";
import { Auth,isStudent,isAdmin } from "../middelware/auth.js";

const router = express.Router();

// http://localhost:3000/api/v1/regiser

router.post("/register", SignupControllers);
router.post("/login", LoginControllers);

// protected route

// route,middelware,controller ; 3 parameter

router.get("/test",Auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route for Testing"
    })
})


router.get("/student",Auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route for student"
    })
})


router.get("/admin",Auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route for Admin"
    })
})



export default router;
