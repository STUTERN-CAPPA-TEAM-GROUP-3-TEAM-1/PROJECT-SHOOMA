import dotenv from "dotenv";
dotenv.config();

export const production ={
    mongodb_connection_url: process.env.PRODUCTION_MONGODB_CONNECTION_URL,
    port: +process.env.PORT,
    // facebook_UserId: +process.env.FACEBOOK_USERID,
    auth_Token: process.env.AUTHTOKEN,
    // client_id: process.env.CLIENT_ID,
    // client_secret: process.env.CLIENT_SECRET
}