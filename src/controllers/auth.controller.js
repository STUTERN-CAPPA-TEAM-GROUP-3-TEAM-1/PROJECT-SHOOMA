import User from "../models/user.model.js";
import axios from "axios";
import {
  createUserValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import bcrypt from "bcrypt";
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
} from "../utils/constant.js";
import { signToken } from "../utils/helper.js";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

export default class AuthController {
  static async createAccountWithFB(req, res, next) {
    try {
      const { accessToken } = req.body;
      const response = await axios.get(
        `https://graph.facebook.com/v15.0/me?fields=id,name,first_name,last_name&access_token=${accessToken}`
      );
      console.log(response.data);
      const { id, name, first_name, last_name } = response.data;
      const newUser = new User({
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        name: response.data.name,
      });
      await newUser.save();
      return res.json({
        status: true,
        message: "User created successfully",
        data: {
          id,
          name,
          first_name,
          last_name,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  static async createAccountWithGoogle(req, res, next) {
    try {
      const { accessToken } = req.body;
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessToken}`
      );
      console.log(response.data);
      const { id } = response.data;
      console.log(`User ID: ${id}`);
      return res.json({ id });
    } catch (error) {
      return next(error);
    }
  }

  static async createAccount(req, res, next) {
    try {
      const { error } = createUserValidator.validate(req.body);
      if (error) {
        return res.status(BAD_REQUEST).json({
          status: false,
          message: "There's a missing field in your input",
          error,
        });
      }
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      let user = await User.findOne({ username: req.body.username });
      if (user) {
        return res.status(BAD_REQUEST).json({
          status: false,
          message: "User with this username already exists",
        });
      }
      user = new User(req.body);
      user = await user.save();
      const token = signToken({ id: user._id, username: user.username });
      return res.status(CREATED).json({
        status: true,
        message: "User created successfully",
        token,
        data: user,
      });
    } catch (e) {
      return next(e);
    }
  }
  static async login(req, res, next) {
    try {
      const { error } = loginValidator.validate(req.body);
      if (error) {
        return res.status(BAD_REQUEST).json({
          status: false,
          message: "There's a missing field in your input",
          error,
        });
      }
      const user = await User.findOne({ username: req.body.username }).select(
        "+password"
      );
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }
      const password = bcrypt.compareSync(req.body.password, user.password);
      user.password = undefined;
      if (!password) {
        return res.status(BAD_REQUEST).json({
          status: false,
          message: "Invalid Username or Password",
        });
      }
      const token = signToken({ id: user._id, username: user.username });
      return res.status(CREATED).json({
        status: true,
        message: "Logged in successfully",
        token,
        data: user,
      });
    } catch (e) {
      return next(e);
    }
  }

  static async sendPasswordResetEmail(req, res, next) {
    const { email } = req.body;
    // Generate a unique reset token
    const resetToken = generateResetToken();
    try {
      // Save the reset token in the user's document in the database
      await User.findOneAndUpdate({ email }, { resetToken });

      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Password Reset",
        html: `
        <p>Hello,</p>
        <p>You have requested to reset your password. Please click on the link below to create a new password:</p>
        <a href="http://localhost:3000/reset-password/${resetToken}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          throw error;
        } else {
          console.log("Password reset email sent:", info.response);
          res.status(200).json({ message: "Password reset email sent" });
        }
      });
    } catch (error) {
      console.error("Error sending password reset email:", error);
      res.status(500).json({ message: "Failed to send password reset email" });
    }
  }
}
