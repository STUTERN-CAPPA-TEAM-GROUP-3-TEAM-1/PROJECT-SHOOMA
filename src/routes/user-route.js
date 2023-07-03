import { Router } from "express";

import AuthController from '../controllers/auth.controller.js';
import { tryCatchHandler } from "../utils/catchAsync.js";


const router = Router();

router.post("/auth/sign-up/facebook", tryCatchHandler (AuthController.createAccountWithFB))
router.post("/auth/sign-up", tryCatchHandler (AuthController.createAccount))
router.post("/auth/login", tryCatchHandler (AuthController.login))

export default router;