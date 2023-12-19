import { Router } from "express";
import {
  createBookDetails,
  deleteBookDetails,
  getAllBookDetails,
  getBookDetails,
  getBooksByCategory,
  updateBookDetails,
} from "../Controllers/library.controller.js";
import upload from "../Middlewares/multer.middleware.js";
import {isAdmin, isLoggedIn} from "../Middlewares/auth.middleware.js";

const libraryRoute = Router();

libraryRoute
  .route("/")
  .post(isLoggedIn,isAdmin("ADMIN"), upload.single("thumbnail"), createBookDetails)
  .get(isLoggedIn, getAllBookDetails);

  
libraryRoute
  .route("/:_id")
  .get(isLoggedIn, getBookDetails)
  .put(isLoggedIn, isAdmin("ADMIN"), upload.single("thumbnail"),updateBookDetails)
  .delete(isLoggedIn, isAdmin("ADMIN"), deleteBookDetails)

libraryRoute.get('/category/:category', getBooksByCategory);

export default libraryRoute;
