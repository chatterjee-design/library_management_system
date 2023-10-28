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
    const token = await user.generateJWTToken();
    user.password = undefined
    res.cookie('token', token, cookieOptions);

    res.status(200).json({
        success: true,
        message : 'User successfully registered'
    })
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

const login = async (req, res, next) => {

   try {
    const {  email, password } = req.body;

    if ( !email || !password) {
      return next(new AppError("All fields are required 🙄", 400));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new AppError("Invalid Credential 🫥", 404)); // 404 for Not Found
      }
    if (!( await user.comparePassword(password))) {
      return next(new AppError("Invalid Credential 🫥", 401));
    }
    //generate token
    const token = await user.generateJWTToken()
    user.password = undefined
    res.cookie('token', token, cookieOptions);

    res.status(200).json({
        success: true,
        message : 'User successfully logged in',
        user
    })
    

   } catch (error) {
    return next(new AppError("Internal Server Error", 500));
   }

};

const logout = async (req, res, next) => {
    try {
        const cookieOption = {
            expires: new Date(), // current expiry date
            httpOnly: true, //  not able to modify  the cookie in client side
          };
      
          // return response with cookie without token
          res.cookie("token", null, cookieOption);

          res.status(200).json({
            success: true,
            message : 'User successfully logged out',
        })

    } catch (error) {
        return next(new AppError("Internal Server Error", 500));
    }
}

const getUser = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return next(new AppError("User not found 😒", 400));
        }

        res.status(200).json({
            success: true,
            message : 'User data retrieved successfully 😊',
            data : user
        })

    } catch (error) {
        return next(new AppError("Internal Server Error", 500));
    }
}
export { register, login,  logout , getUser};
