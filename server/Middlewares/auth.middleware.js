import Jwt from "jsonwebtoken";
import AppError from "../Utills/appError.js";

// check if the user is logged in
const isLoggedIn = async (req, res, next) => {
  try {
    //generated token from cookies
    const { token } = req.cookies;
    // if token is null or empty or not valid
    if (!token) {
      return next(new AppError("Not Authorised 🙄", 400));
    }

    //verify token against secret token
    const payload = await Jwt.verify(token, process.env.SECRET_KEY);

    //set the id and email and role from user data
    req.user = payload;

    next();

  } catch (error) {
    return next(new AppError("Authentication Problem 🫥", 500));
  }
};

// auth to check if user is authorized
const isAdmin = (requiredRoles) => {
  return (req, res, next) => {
    try {
      //role from the request  
      const userRole = req.user.role;

      //if the user is authorized or admin
      if (userRole === requiredRoles || userRole === "ADMIN") {
        next();
      }else{
        //if the user is not authorized or not an admin
        return next(new AppError("Not Authorised, You are not an Admin!", 400));
      }

    } catch (error) {
      return next(new AppError("Authentication Problem 🫥", 500));
    }
  };
};

export {
    isAdmin,
    isLoggedIn
};
