import { Router } from "express";
import { createBookDetails, getAllBookDetails } from "../Controllers/library.controller.js";

const libraryRoute = Router()

libraryRoute
.route('/')
.post(createBookDetails)
.get(getAllBookDetails)

export default libraryRoute;