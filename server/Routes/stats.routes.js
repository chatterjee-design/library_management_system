import { Router } from "express";
import { statCount } from "../Controllers/stats.controller.js";
import { isAdmin, isLoggedIn } from "../Middlewares/auth.middleware.js";


const statsRoute = Router();

statsRoute
  .route("/")
  .get(isLoggedIn, isAdmin("ADMIN"), statCount)

export default statsRoute
