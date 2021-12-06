import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import AppError from "../utils/appError";
import Payload from "../utils/payload";

const signToken = (payload: Payload, ) => {
    // @ts-ignore
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const { name, email, password, photo } = req.body;
    console.log(req.body);
    const user = await User.create({ name, email, password, photo });
    if(!user){
        return next(new AppError("Something went wrong with creating your account. Try again.", 400))
    }

    const payload: Payload = {
        id: user._id,
        name: user.name,
        email: user.email,
    };

    const token = signToken(payload);

    res.status(200).json({ status: "ok", code: 200, message: "ok", token });
});


const login = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    let token: string = "";
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    console.log(user)

    if(!user){
        return next(new AppError("Incorrect password or email.", 401));
    }

    if(await user.verifyPassword(password, user.password)){
        const payload: Payload = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        token = signToken(payload);
        return res.status(200).json({ message: "success", token })
    } else {
        return next(new AppError("Incorrect password or email.", 401));
    }
});

const verify = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    let token: string = "";
    if(req.headers.authorization && `${req.headers.authorization}`.startsWith("Bearer")){
       token = req.headers.authorization.split(" ")[1];
       // @ts-ignore
       jwt.verify(token, process.env.JWT_SECRET, (err: Error, data: Object)=>{
           if(err){
               return next(new AppError("Something went wrong. Login again", 403));
           }

           // @ts-ignore
           req.user = data;
           return next();
       })
    }
});

export { verify, login, createUser }
