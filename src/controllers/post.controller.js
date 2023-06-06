import Post from "../models/post.model";
import { BAD_REQUEST, OK } from "../utils/constant";
import { createPostValidator } from "../validators/post.validator";

export default class PostController {
  static async create(req, res, next) {
    try {
      const { error } = createPostValidator.validate(req.body);
      if (error) {
        return res.status(BAD_REQUEST).json({
          status: false,
          message: "There's a missing field in your input",
          error,
        });
      }
      let post = new Post({
        ...req.body,
        user: req.authId,
      });
      post = await post.save();
      return res.status(OK).json({
        status: true,
        message: "Post created successfully",
        data: post,
      });
    } catch (error) {
      return next(error);
    }
  }
  static async find(req, res, next) {
    try {
      return res.status(OK).json({
        status: false,
        message: "Find Posts",
      });
    } catch (error) {
      return next(error);
    }
  }
  static async findOne(req, res, next) {
    try {
      return res.status(OK).json({
        status: false,
        message: "Find one post",
      });
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      return res.status(OK).json({
        status: false,
        message: "Update post",
      });
    } catch (error) {
      return next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      return res.status(OK).json({
        status: false,
        message: "Delete post",
      });
    } catch (error) {
      return next(error);
    }
  }
}
