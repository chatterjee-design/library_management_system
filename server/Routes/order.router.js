import { Router } from "express";
import { isLoggedIn } from "../Middlewares/auth.middleware.js";
import {  getAllOrders, getOneOrder, placeOrder } from "../Controllers/order.controller.js";


const orderRoute = Router();

orderRoute
  .route("/")
  .post(isLoggedIn, placeOrder)
  .get(isLoggedIn, getAllOrders)

orderRoute
  .route("/:_id")
  .get(isLoggedIn, getOneOrder)

export default orderRoute;
