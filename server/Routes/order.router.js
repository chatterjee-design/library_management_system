import { Router } from "express";
import { isLoggedIn } from "../Middlewares/auth.middleware.js";
import { getOrderDetails, placeOrder } from "../Controllers/order.controller.js";


const orderRoute = Router();

orderRoute
  .route("/")
  .post(isLoggedIn, placeOrder)
  .get(isLoggedIn, getOrderDetails)

export default orderRoute;
