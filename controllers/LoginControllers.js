import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const LoginControllers = async (req, res) => {
  try {
    // data fetch
    const { email, password } = req.body;
    // validate email and password
    if (!email || !password) {
      res.status(404).json({
        success: false,
        message: "Please fill all the details",
      });
    }
    // check user is available
    let user = await UserModel.findOne({ email });
    // if not register user
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User is not register",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    // verify password and genarate jwt token
    if (await bcrypt.compare(password, user.password)) {
      // login
      let token = Jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      }); // create token

      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, option).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
      // res.status(200).json({
      //   success: true,
      //   token,
      //   user,
      //   message: "User logged in successfully",
      // });
    } else {
      // password does not match
      res.status(404).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Login Failed",
    });
  }
};

export default LoginControllers;
