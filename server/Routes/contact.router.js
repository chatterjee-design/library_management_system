import  {Router } from "express";
import { contactUs } from "../Controllers/contact.controller.js";


const contactUsRouter = Router();

contactUsRouter.post('/', contactUs)

export default contactUsRouter