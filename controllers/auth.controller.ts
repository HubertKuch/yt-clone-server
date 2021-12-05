import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import {NextFunction, Request, Response} from "express";
import User from "../models/user.model";
import AppError from "../utils/appError";
import Payload from "../utils/payload";

const login = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    let token: string = "";
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if(!user){
        return next(new AppError("Fail password or email.", 401));
    }

    if(await user.verifyPassword(password, user.password)){
        const payload: Payload = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        token = jwt.sign(
            payload,
            // @ts-ignore
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        return res.status(200).json({ message: "success", token })
    }
});

const verify = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    let token: string = "";
    if(req.headers.authorization && `${req.headers.authorization}`.startsWith("Bearer")){
       token = req.headers.authorization.split(" ")[1];
    }
    console.log(token)
    next();
});

export { verify, login }
