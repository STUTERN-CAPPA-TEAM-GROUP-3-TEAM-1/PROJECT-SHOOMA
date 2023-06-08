import { token } from "morgan";
import Profile from "../models/profile.model";
import { PROFILE } from "../utils/constant";
import { profileValidator } from "../validators/post.validator";

export default class ProfileController {
  static async findProfile(req, res, next) {
    try {
      const profile = await PROFILE.findone({ username: req.user.id });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      return res.status(200).json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
  static async updateOrofile(req, res, next) {
    Profile.updateOne(
      {
        _id: current_user._id,
      },
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      }
    );

    return res.status(200).send({
      message: "Profile Successfully Updated",
      data: {},
    });
  }

  static async changeusername(req, res, next) {
    try {
      let username = await Profile.findOne({ username: req.body.username });
      const nameupdate = new username();
      if (username == nameupdate) {
        return res.status(BAD_REQUEST).json({
          status: false,
          message: "Username must be different from current one",
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  static async changeemail(req, res, next) {
    try {
      let email = await Profile.findOne({ email: req.body.email });
      const emailupdate = new email();
      if (email == emailupdate) {
        return res.status(BAD_REQUEST).json({
          status: false,
          message: "email must be different from current one",
        });
      }
    } catch (e) {
      return next(e);
    }
    return res.status(200).send({
      message: "Profile Successfully Updated",
      data: {},
    });
  }

  static async changephonenumber(req, res, next) {
    try {
      let phonenumber = await Profile.findOne({
        phonenumber: req.body.phonenumber,
      });
      const phonenumberupdate = new phonenumber();
      if (phonenumber == phonenumberupdate) {
        return res.status(BAD_REQUEST).json({
          status: false,
          message: "phonenumber must be different from current one",
        });
      }
    } catch (e) {
      return next(e);
    }

    return res.status(200).send({
      message: "Profile Successfully Updated",
      data: {},
    });
  }
}

