// routes/cart.route.js
import { Router } from "express";
import { isLoggedIn } from "../Middlewares/auth.middleware.js";
import { addToCart, getCart } from "../Controllers/cart.controller.js";


const cartRoute = Router();

cartRoute
  .route("/")
  .post(isLoggedIn, addToCart)
  .get(isLoggedIn, getCart);

export default cartRoute;
