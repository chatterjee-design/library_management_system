import User from "../Models/user.schema.js";
import AppError from "../Utills/appError.js";
import sendEmail from "../Utills/sendMail.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import cloudinary from "cloudinary"
import fs from "fs/promises"

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  httpOnly: true,
};

const register = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;


    if (!fullname || !email || !password) {
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
      avatar: {
        public_id : email,
        secure_url : "https://www.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_36332651.htm#query=user&position=6&from_view=search&track=sph"
      }
    });
    if (!user) {
      return next(
        new AppError("User registration failed, please try again 🫥", 400)
      );
    }
  
    // run only if user send a file
    if(req.file && req.file.avatar){
      console.log(req.file )
     
        const {avatar} = req.file

        console.log(avatar)
        const file = await cloudinary.v2.uploader.upload(req.file.path,{
          folder : 'server',
          width : 200,
          height : 200,
          gravity : 'faces',
          crop : 'fill'
        })

        if (file) {
          user.avatar.public_id = file.public_id;
          user.avatar.secure_url = file.secure_url;
        }
       await user.save()
      
      
    }

    //generating the jwt token
    const token = await user.generateJWTToken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User successfully registered",
      data : user
    });
  } catch (error) {
    console.log(error.message)
    return next(new AppError("Internal Server Error", 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("All fields are required 🙄", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError("Invalid Credential 🫥", 404)); // 404 for Not Found
    }
    if (!(await user.comparePassword(password))) {
      return next(new AppError("Invalid Credential 🫥", 401));
    }
    //generate token
    const token = await user.generateJWTToken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User successfully logged in",
      user,
    });
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
      message: "User successfully logged out",
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return next(new AppError("User not found 😒", 400));
    }

    res.status(200).json({
      success: true,
      message: "User data retrieved successfully 😊",
      data: user,
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new AppError("All fields are required 🙄", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError("User does not exists 🙄", 400));
    }

    //generating the reset token
    const resetToken = await user.generateResetToken();

    await user.save();

    //generating the rest password url
    const resetPassowordUrl =
      await `${req.protocol}://${req.hostname}/api/reset-password/${resetToken}`; //req.protocol = 'http or https'

    //send the url to the mail
    const subject = "reset password";
    const message = `You can reset your password by clicking here: <a href="${resetPassowordUrl}" target="_blank">Reset your password</a>`;

    await sendEmail(subject, message, email);

    res.status(200).json({
      success: true,
      message: "succesfull send the mail 😊",
      data: resetPassowordUrl,
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// reset password
const resetPassword = async (req, res, next) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    if (!password) {
      return next(new AppError("All fields are required 🙄", 400));
    }

    const forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return next(new AppError("Token is invalid or expired", 400));
    }

    user.password = await bcrypt.hash(password, 10);
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "password has been changed 😊",
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

//change password
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return next(new AppError("All fields are required 🙄", 400));
    }

    const userId = req.user.id;
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return next(new AppError("User does not exists 🙄", 400));
    }

    //check if the old pasword matches
    const isPassMatch = await user.comparePassword(oldPassword);
    if (!isPassMatch) {
      return next(new AppError("Old-password does not matching 🙄", 400));
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "password has been changed 😊",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    return next(new AppError("Internal Server Error", 500));
  }
};

// //update user 
// const updateUser = async (req, res, next) => {
//   try {
    
//     const {fullname} = req.body;
//     if (!fullname) {
//       return next(new AppError("All fields are required 🙄", 400));
//     }
    
//     const {id} = req.params

//     const user = await User.findById(id);
//     if (!user) {
//       return next(new AppError("User does not exists 🙄", 400));
//     }

//     user.fullname = fullname;

//     if (req.file){

//     }

//   } catch (error) {
//     return next(new AppError("Internal Server Error", 500));
//   }
// }

export {
  register,
  login,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
  changePassword,
};
