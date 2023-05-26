import dotenv from "dotenv";
dotenv.config();

export const staging ={
    mongodb_connection_url: process.env.STAGING_MONGODB_CONNECTION_URLL,
    port: +process.env.PORT,
    facebook_UserId: +process.env.APP_ID,
    auth_Token: process.env.AUTHTOKEN,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
};