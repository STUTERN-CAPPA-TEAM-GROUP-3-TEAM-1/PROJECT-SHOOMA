import express from "express";
import mongoose from "mongoose";
import { config } from "./config/index.js";
import { router as userRouter } from "./src/routes/user-route.js";
import { globalErrorHandler } from "./src/utils/errorHandlers.js";



const app = express()



//Password Reset
import passwordReset from "./src/controllers/passportConfig.js"
app.post("/resetPassword", passwordReset);


//Databse connection
mongoose.connect(config.mongodb_connection_url).then(() => console.log("Database Connection Established")).catch((e) => console.log(e.message));
console.log(config.mongodb_connection_url)

// PORT
const port = config.port || 8080;


// Middlewares
app.use(express.json())

app.use("/api/shooma/user", userRouter)

app.use(globalErrorHandler);



// setting up port
app.listen(port, ()=>{
    console.log(`server listening on port: ${port}`)
});



// global error handler
// app.use((err, req, res, next)=>{
//     return res.status(err.status || 404).json({
//       message: err.message,
//       status: "Failed",
//     })
//   })