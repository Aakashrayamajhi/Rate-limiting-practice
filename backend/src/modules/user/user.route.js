import express from "express"
import signupController from "./usersignup.controller.js";

const userRouter = express.Router()

userRouter.post("/signup", signupController)

export default userRouter
