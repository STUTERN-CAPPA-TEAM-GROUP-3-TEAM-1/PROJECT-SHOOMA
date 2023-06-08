import { Router } from "express";

import ProfileController from "../controllers/profile-controller";
import { tryCatchHandler } from "../utils/catchAsync.js";
import auth from "../middlewares/auth";

const router = Router();

router
  .route("/profile/me")
  .get(auth, tryCatchHandler(ProfileController.find));


export default router;



