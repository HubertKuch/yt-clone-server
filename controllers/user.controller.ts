import User from "../models/user.model";
import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction} from "express";
import AppError from "../utils/appError";

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const users: Array<Object> = await User.find({});
    res.status(200).json({ msg: "ok", users });
})

const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const { id } = req.params;
    if(!id){
        return next(new AppError("Please put id.", 400));
    }
    const user = await User.findByIdAndDelete(id)

    res.status(204).json({ status: "ok", code: 204, message: "ok", })
});

export { getAllUsers, deleteUser }
