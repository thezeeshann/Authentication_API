import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

const SignupControllers = async (req, res) => {
  try {
    // get data
    const { name, email, password, role } = req.body;
    // if user is alredy exist
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User is alredy exist",
      });
    }
    // secure password
    let hasPassword;
    try {
      hasPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in hasing password",
      });
    }
    // create entry user
    const user = await UserModel.create({
      name,
      email,
      password: hasPassword,
      role,
    });
    res.status(200).json({
      success: true,
      message: "User Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User can not be register",
    });
  }
};

export default SignupControllers;
