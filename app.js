import express from "express";
import mongoose from "mongoose";
import { router as userRouter } from "./src/routes/user-route.js";
import { globalErrorHandler } from "./src/utils/errorHandlers.js";
import config from "config";

const app = express();

mongoose
  .connect(config.get("db.uri"))
  .then(() =>
    console.log("Database Connection Established", config.get("db.uri"))
  )
  .catch((e) => console.log(e.message));

// PORT
const port = config.get('app.port')

app.use(express.json());

app.use("/api/shooma/user", userRouter);

app.use(globalErrorHandler);

// setting up port
app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});

// global error handler
// app.use((err, req, res, next)=>{
//     return res.status(err.status || 404).json({
//       message: err.message,
//       status: "Failed",
//     })
//   })
