import  {Router } from "express";
import { forgotPassword, getUser, login, logout, register, resetPassword } from "../Controllers/user.controller.js";
import jwtAuth from "../Middlewares/auth.middleware.js";

const router = Router();
 
router.post('/register', register)
router.post('/login', login)
router.get ('/logout',jwtAuth, logout)
router.get ('/user', jwtAuth, getUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:resetToken', resetPassword)

export default router