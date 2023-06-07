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
      const posts = await Post.find();
      
      return res.status(OK).json({
        status: true,
        message: 'Posts found',
        data: posts,
      });
    } catch (error) {
      return next(error);
    }
  }
  static async findOne(req, res, next) {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      
      if (!post) {
        return res.status(BAD_REQUEST).json({
          status: false,
          message: 'Post not found',
        });
      }
      
      return res.status(OK).json({
        status: true,
        message: 'Post found',
        data: post,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const postId = req.params.id;
      const updateData = req.body;
      const updatedPost = await Post.findByIdAndUpdate(postId, updateData, { new: true });
  
      if (!updatedPost) {
        return res.status(BAD_REQUEST).json({
          status: false,
          message: 'Post not found',
        });
      }
  
      return res.status(OK).json({
        status: true,
        message: 'Post updated successfully',
        data: updatedPost,
      });
    } catch (error) {
      return next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const postId = req.params.id;
      const deletedPost = await Post.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.status(BAD_REQUEST).json({
          status: false,
          message: 'Post not deleted',
        });
      }
  
      return res.status(OK).json({
        status: true,
        message: 'Post deleted successfully',
      });
    } catch (error) {
      return next(error);
    }
  }
}
