import { Router } from "express";
import { isLoggedIn } from "../Middlewares/auth.middleware.js";
import { addToCart, getCart, removeFromCart } from "../Controllers/cart.controller.js";


const cartRoute = Router();

cartRoute
  .route("/")
  .post(isLoggedIn, addToCart)
  .get(isLoggedIn, getCart)
  .delete(isLoggedIn, removeFromCart);

export default cartRoute;
