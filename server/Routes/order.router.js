import { Router } from "express";
import { isLoggedIn } from "../Middlewares/auth.middleware.js";
import {  getAllOrders, placeOrder } from "../Controllers/order.controller.js";


const orderRoute = Router();

orderRoute
  .route("/")
  .post(isLoggedIn, placeOrder)
  .get(isLoggedIn, getAllOrders)


export default orderRoute;
