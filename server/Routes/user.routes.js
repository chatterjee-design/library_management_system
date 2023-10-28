import  {Router } from "express";
import { getUser, login, logout, register } from "../Controllers/user.controller.js";
import jwtAuth from "../Middlewares/auth.middleware.js";

const router = Router();
 
router.post('/register', register)
router.post('/login', login)
router.get ('/logout',jwtAuth, logout)
router.get ('/user', jwtAuth, getUser)

export default router