import { Router } from "express"
import { getAllUsers } from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.get("/", getAllUsers);

export default userRouter;