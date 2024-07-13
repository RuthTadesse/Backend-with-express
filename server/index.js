import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import {userRouter} from "./routes/user.js"

const app=express()
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/project');
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}
))
app.use(cookieParser())
app.use('/auth',userRouter)


app.listen(process.env.PORT,()=>console.log(`Server started on port ${process.env.PORT}`))