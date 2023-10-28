import  Jwt  from "jsonwebtoken";

const jwtAuth = async (req, res, next) => {
try {
    const { token } = req.cookies;

    if (!token) {
        return next(new AppError("Not Authorised 🙄", 400));
    }
    const payload = await Jwt.verify(token , process.env.SECRET_KEY)
     
    req.user = {id : payload.id, email : payload.email}
    next()

} catch (error) {
    return next(new AppError("Authentication Problem 🫥", 500));
}
};

export default jwtAuth;
