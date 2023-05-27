import dotenv from "dotenv";
dotenv.config();

export const development ={
    mongodb_connection_url: process.env.DEV_MONGODB_CONNECTION_URL,
    port: +process.env.PORT,
    // facebook_UserId: +process.env.FACEBOOK_USERID,
    auth_Token: process.env.AUTHTOKEN,
    // callback_Url: process.env.CALLBACK_URL,
    // client_id: process.env.CLIENT_ID,
    // client_secret: process.env.CLIENT_SECRET
};