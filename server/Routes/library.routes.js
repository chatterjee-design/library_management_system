import { Router } from "express";
import {
  createBookDetails,
  deleteBookDetails,
  getAllBookDetails,
  getBookDetails,
  updateBookDetails,
} from "../Controllers/library.controller.js";
import upload from "../Middlewares/multer.middleware.js";
import isLoggedIn from "../Middlewares/auth.middleware.js";

const libraryRoute = Router();

libraryRoute
  .route("/")
  .post(upload.single("thumbnail"), createBookDetails)
  .get(getAllBookDetails);

libraryRoute
  .route("/:_id")
  .get( getBookDetails)
  .put( upload.single("thumbnail"),updateBookDetails)
  .delete(deleteBookDetails)

export default libraryRoute;
