import { Router } from "express"
import { getAllUsers, deleteUser } from "../controllers/user.controller";
import { login, verify, createUser } from "../controllers/auth.controller";
const userRouter: Router = Router();

userRouter.post("/login", login);
userRouter.post("/signup", createUser);

userRouter.get("/", verify, getAllUsers);
userRouter.delete("/:id", verify, deleteUser);

export default userRouter;