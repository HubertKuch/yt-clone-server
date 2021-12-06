import express, {Application, NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import userRouter from "./routes/user.router";
import filmsRouter from "./routes/films.router";
import AppError from "./utils/appError";

const app: Application = express();
app.use(express.urlencoded({ extended: true, }));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/films", filmsRouter);

app.all("*", (req: Request, res: Response, next: NextFunction)=>{
    return next(new AppError(`route ${req.baseUrl} is not defined`, 404))
})

app.use((err: any, req: Request, res: Response, next: NextFunction)=>{
    err.code = err.code ?? 500;
    err.message = err.message ?? "fail";
    err.status = err.status ?? "fail";

    if(process.env.NODE_ENV === "development"){
        console.log(err.stack);
        res.status(err.code).json({
            stack: err.stack,
            code: err.code,
            message: err.message,
            status: err.status,
        });
    } else if(process.env.NODE_ENV === "production") {
        console.log(err);
        if(err.isOperationalError){
            res.status(err.code).json({
                code: err.code,
                message: err.message,
                status: err.status,
            });
        } else {
            res.status(500).json({
                code: 500,
                message: "Something went very wrong.",
                status: err.status,
            });
        }
    }

    res.status(err.code).json({ message: err.message, code: err.code, status: err.status })
})

// @ts-ignore
let db: string = process.env.DB_URI;

// @ts-ignore
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => { console.log("Connected"); });

export default app;