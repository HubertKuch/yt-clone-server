import { Router } from "express"
import { getAllUsers, createUser, deleteUser } from "../controllers/user.controller";
import {login, verify} from "../controllers/auth.controller";
const userRouter: Router = Router();

userRouter.post("/login", login);

userRouter.get("/", verify, getAllUsers);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;