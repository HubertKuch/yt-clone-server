import User from "../models/user.model";
import catchAync from "../utils/catchAync";
import { Request, Response, NextFunction} from "express"

const getAllUsers = catchAync(async (req: Request, res: Response, next: NextFunction)=>{
    const users: Array<Object> = await User.find({});

    res.status(200).json({ msg: "ok", users });
})

export { getAllUsers }
