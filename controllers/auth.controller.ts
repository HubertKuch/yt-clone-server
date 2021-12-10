import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import AppError from "../utils/appError";

const signToken = (id: string): string => {
    //@ts-ignore
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const { name, email, password, photo } = req.body;

    const user = await User.create({ name, email, password, photo });

    if(!user){
        return next(new AppError("Something went wrong with creating your account. Try again.", 400))
    }

    const token = signToken(user._id);

    res.status(200).json({ code: 200, message: "ok", token });
});


const login = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const { email, password } = req.body;

    if(!email || !password){
        return next(new AppError("Pass email and password!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user || !(await user.verifyPassword(password, user.password))){
        return next(new AppError("Incorrect password or email.", 401));
    }

    const token: string = signToken(user._id);

    res.status(200).json({ message: "ok", status: 200, token });
});

const verify = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    let token: string = "";
    if(req.headers.authorization && `${req.headers.authorization}`.startsWith("Bearer")){
       token = req.headers.authorization.split(" ")[1];
       // @ts-ignore
       jwt.verify(token, process.env.JWT_SECRET, (err: Error, data: Object)=>{
           if(err){
               console.log(err)
               return next(new AppError("Something went wrong. Login again", 403));
           } else {
               //@ts-ignore
               req.user = data;
               next();
           }
       })
    } else {
        return next(new AppError("Token was not defined", 400));
    }
});

function restrictTo(...roles: any[]){
    return (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore
        if(!roles.includes(req.user.role)){
            return next(
                new AppError("You dont have permission to do this!", 403)
            );
        }

        next();
    }
}

export { verify, login, createUser, restrictTo };
