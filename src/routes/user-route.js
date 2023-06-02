import express from "express";
// import { CreateAccountWithSocial } from "../controllers/passportConfig.js"

import CreateAccountWithSocial from '../controllers/passportConfig.js';
// import GoogleAuth from "../utils/googleAuth.js"
import { tryCatchHandler } from "../utils/catchAsync.js";


const router = new express.Router();

//Registration route
router.post("/register", CreateAccountWithSocial.register);


router.post("/signup/facebook", tryCatchHandler (CreateAccountWithSocial.createAccountwithFB));

// router.get("/getToken/google", tryCatchHandler (GoogleAuth.CreateGoogleAuthToken));

export { router }