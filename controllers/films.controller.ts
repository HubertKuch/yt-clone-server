import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import Film from "../models/film.model";

const getAllFilms = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const films: Array<object> = await Film.find({})
        .populate("userId");

    res.status(200).json({ code: 200, message: "ok", films })
});

const createFilm = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const { title, description, userId } = req.body;

    const newFilm = await Film.create({ title, description, userId });

    res.status(200).json({ status: 200, message: "ok", film: newFilm })
});

export { getAllFilms, createFilm }
