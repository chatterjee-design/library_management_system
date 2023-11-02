import  {Router } from "express";
import { changePassword, forgotPassword, getUser, login, logout, register, resetPassword, updateUser } from "../Controllers/user.controller.js";
import jwtAuth from "../Middlewares/auth.middleware.js";
import upload from "../Middlewares/multer.middleware.js";

const router = Router();
 
router.post('/register',upload.single('avatar'), register)
router.post('/login', login)
router.get ('/logout',jwtAuth, logout)
router.get ('/user', jwtAuth, getUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:resetToken', resetPassword)
router.post('/change-password/:_id',jwtAuth, changePassword)
router.put('/update/:_id',jwtAuth, upload.single('avatar'), updateUser)

export default router