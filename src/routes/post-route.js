import { Router } from "express";

import PostController from "../controllers/post.controller";
import { tryCatchHandler } from "../utils/catchAsync.js";
import auth from "../middlewares/auth";

const router = Router();

router
  .route("/posts")
  .post(auth, tryCatchHandler(PostController.create))
  .get(auth, tryCatchHandler(PostController.find));

router
  .route("/posts/:id")
  .get(auth, tryCatchHandler(PostController.findOne))
  .put(auth, tryCatchHandler(PostController.update))
  .delete(auth, tryCatchHandler(PostController.delete));

export default router;
