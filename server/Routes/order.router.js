import { Router } from "express";
import { isLoggedIn } from "../Middlewares/auth.middleware.js";
import {  placeOrder } from "../Controllers/order.controller.js";


const orderRoute = Router();

orderRoute
  .route("/")
  .post(isLoggedIn, placeOrder)


export default orderRoute;
