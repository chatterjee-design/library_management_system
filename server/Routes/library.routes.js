import { Router } from "express";
import { createBookDetails } from "../Controllers/library.controller.js";

const libraryRoute = Router()

libraryRoute
.route('/')
.post(createBookDetails)

export default libraryRoute;