import { Router } from "express"
import { getAllUsers, deleteUser } from "../controllers/user.controller";
import {login, verify, createUser } from "../controllers/auth.controller";
const userRouter: Router = Router();

userRouter.post("/login", login);

userRouter.get("/", verify, getAllUsers);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;