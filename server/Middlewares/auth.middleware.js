import  Jwt  from "jsonwebtoken";
import AppError from "../Utills/appError.js";

const isLoggedIn = async (req, res, next) => {
try {

    //generated token from cookies
    const { token } = req.cookies;
    // if token is null or empty or not valid
    if (!token) {
        return next(new AppError("Not Authorised 🙄", 400));
    }

    //verify token against secret token
    const payload = await Jwt.verify(token , process.env.SECRET_KEY)
     
    //set the id and email from user data
    req.user = {id : payload.id, email : payload.email}
    next()

} catch (error) {
    return next(new AppError("Authentication Problem 🫥", 500));
}
};

export default isLoggedIn;
