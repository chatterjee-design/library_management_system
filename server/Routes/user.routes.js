import  {Router } from "express";
import { changePassword, forgotPassword, getUser, login, logout, register, resetPassword, updateUser } from "../Controllers/user.controller.js";
import upload from "../Middlewares/multer.middleware.js";
import {isLoggedIn} from "../Middlewares/auth.middleware.js";

const userRouter = Router();

//get the user data
userRouter.get ('/logout', isLoggedIn, logout)
userRouter.get ('/user',  isLoggedIn, getUser)

//post routes for create user or login user
userRouter.post('/register',upload.single('avatar'), register)
userRouter.post('/login', login)
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password/:resetToken', resetPassword)
userRouter.post('/change-password/:_id', isLoggedIn, changePassword)

//put routes for updating users
userRouter.put('/update/:_id', isLoggedIn, upload.single('avatar'), updateUser)

export default userRouter;