import express from "express";
import mongoose from "mongoose";
import { config } from "./src/config/index.js";

const app = express()

//Databse connection
mongoose.connect(config.mongodb_connection_url).then(() => console.log("Database Connection Established")).catch((e) => console.log(e.message));


// PORT
const port = config.port || 8080;


// setting up port
app.listen(port, ()=>{
    console.log(`server listening on port: ${port}`)
});



// global error handler
app.use((err, req, res, next)=>{
    return res.status(err.status || 404).json({
      message: err.message,
      status: "Failed",
    })
  })