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
  .post(isLoggedIn, upload.single("thumbnail"), createBookDetails)
  .get(isLoggedIn, getAllBookDetails);

libraryRoute
  .route("/:_id")
  .get(isLoggedIn, getBookDetails)
  .put(isLoggedIn, upload.single("thumbnail"),updateBookDetails)
  .delete(isLoggedIn, deleteBookDetails)

export default libraryRoute;
