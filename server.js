import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userFinalRouter from "./routes/userFinalRoute.js";

//app config
const app = express();
const port = process.env.PORT || 4000;


connectDB(); //mongodb connection


//middleware
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Added line

//api endpoing
app.use("/api/userFinal", userFinalRouter);

app.get("/", (req, res) => {
  res.send("api worikg");
});

app.listen(port, () => console.log("server start", port));
