import { Router } from "express";
import { createBookDetails, getAllBookDetails } from "../Controllers/library.controller.js";
import upload from "../Middlewares/multer.middleware.js";

const libraryRoute = Router()

libraryRoute
.route('/')
.post(upload.single('thumbnail'),createBookDetails)
.get(getAllBookDetails)

export default libraryRoute;