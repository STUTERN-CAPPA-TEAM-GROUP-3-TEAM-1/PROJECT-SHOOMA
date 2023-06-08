import Ad from "../models/ad.model";

import { NOT_FOUND,BAD_REQUEST, OK } from "../utils/constant";

import { createAdValidator } from "../validators/ad.validator";


export default class AdController {
  static async createAd(req, res, next) {
    try {
      const { error } = createAdValidator.validate(req.body);
      if (error) {
        return res.status(BAD_REQUEST).json({
          status: false,
          message: "There's a missing field in your input",
          error,
        });
      }
      let ad = new Ad({
        ...req.body,
        user: req.authId,
      });
      ad = await ad.save();
      return res.status(OK).json({
        status: true,
        message: "Ad created successfully",
        data: ad,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  static async getAd(req, res, next) {
    try {
      const ads = await Ad.find();
      return res.status(OK).json(ads);
    } catch (error) {
      return next(error);
    }
  }

  static async getAdById(req, res, next) {
    try {
      const ad = await Ad.findById(req.params.id);
      if (!ad) {
        return res.status(NOT_FOUND).json({ message: "Ad not found" });
      }
      return res.status(OK).json(ad);
    } catch (error) {
      return next(error);
    }
  }

  static async updateAd(req, res, next) {
  try {
    const { header, image, description, createdAt } = createAdValidator.validate(req.body);

    const ad = await Ad.findByIdAndUpdate(
      req.params.id,
      { header, image, description, createdAt },
      { new: true }
    );

    if (!ad) {
      return res.status(NOT_FOUND).json({ message: "Ad not found" });
    }

    res.json(ad);
  } catch (error) {
    return next(error);
  }
}

static async deleteAd(req, res, next){
   try {
     const ad = await Ad.findByIdAndDelete(req.params.id);

     if (!ad) {
       return res.status(NOT_FOUND).json({ message: "Ad not found" });
     }

     res.json({ message: "Ad deleted successfully" });
   } catch (error) {
     return next(error);
   }
}
}