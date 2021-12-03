import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import userRouter from "./routes/user.router";

const app = express();
app.use("/", userRouter)


// @ts-ignore
let db: string = process.env.DB_URI;

// @ts-ignore
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => { console.log("Connected"); });

export default app;