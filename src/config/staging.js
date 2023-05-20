import dotenv from "dotenv";
dotenv.config();

export const staging ={
    mongodb_connection_url: process.env.STAGING_MONGODB_CONNECTION_URLL,
    port: +process.env.PORT
};