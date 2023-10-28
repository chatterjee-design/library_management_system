import User from "../Models/user.schema.js";
import AppError from "../Utills/appError.js";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
      httpOnly: true,
}

const register = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname, !email, !password) {
      return next(new AppError("All fields are required 🙄", 400));
    }

    // Check if the user is already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError("User already exists 😒", 400));
    }

    //create a new user
    const user = await User.create({
      fullname,
      email,
      password,
    });
    if (!user) {
      return next(
        new AppError("User registration failed, please try again 🫥", 400)
      );
    }

    

    //generating the jwt token
    const token = user.generateJWTToken();
    user.password = undefined
    res.cookie('token', token, cookieOptions);

    res.status(200).json({
        success: true,
        message : 'User successfully registered'
    })
  } catch (error) {
    return next(new AppError("Internal Server Error", 400));
  }
};

const login = (req, res) => {
  res.send("Welcome to the login page!");
};

export { register, login };
