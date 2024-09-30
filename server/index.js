import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({});

//  

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  Credentials: true,
};
app.use(cors(corsOptions));

const PORT =process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
