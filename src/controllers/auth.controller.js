import User from "../models/user.model.js";
import axios from "axios";
import config from "config";
import {
  createUserValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import bcrypt from "bcrypt";

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
        message: "User created successfully",
        status: "Success",
        id,
        name,
        first_name,
        last_name,
      });
    } catch (error) {
      console.error("Access token validation failed:", error.response.data);
      res.status(500).send("Access Validation Failed");
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
      console.error("Access token validation failed:", error.response.data);
      return res.status(500).send("Access Validation Failed");
    }
  }

  static async createAccount(req, res, next) {
    try {
      const { error } = createUserValidator.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: false,
          message: "There's a missing field in your input",
          error,
        });
      }
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      let user = new User(req.body);
      user = await user.save();
      return res.status(200).json({
        status: true,
        message: "User created successfully",
        data: user,
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  }
  static async login(req, res, next) {
    try {
      const { error } = loginValidator.validate(req.body);
      if (error) {
        return res.status(400).json({
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
      if (!password) {
        return res.status(401).json({
          status: false,
          message: "Invalid Username or Password",
        });
      }
      return res.status(200).json({
        status: true,
        message: "Logged in successfully",
        data: user,
      });
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  }
}
