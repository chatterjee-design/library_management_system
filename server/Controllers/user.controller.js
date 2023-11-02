import User from "../Models/user.schema.js";
import AppError from "../Utills/appError.js";
import sendEmail from "../Utills/sendMail.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import cloudinary from "cloudinary"
import fs from "fs/promises"

//set cookieOptions for jwt token
const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  httpOnly: true,
};

const register = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    //if any fields are empty
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

    //if any prblm while creating a new user
    if (!user) {
      return next(
        new AppError("User registration failed, please try again 🫥", 400)
      );
    }
   
  
    // run only if user send a file
    if(req.file){
     try {
      
      //define the cloudinary path
      const file = await cloudinary.v2.uploader.upload(req.file.path,{
        folder : 'server',
        width : 200,
        height : 200,
        gravity : 'faces',
        crop : 'fill'
      })

      //set this public id and secure url to db in place of dami url and id 
      if (file) {
        user.avatar.public_id = file.public_id;
        user.avatar.secure_url = file.secure_url;
      }
     await user.save()

     //delete the file which is in the uploads bcz we are saving it into the cloudinary we don't need it
     fs.rm(`../uploads/${req.file.filename}`)

     } catch (error) {
      return next(new AppError("something went wrong", 400));
     }
    }

    //generating the jwt token
    const token = await user.generateJWTToken();
    user.password = undefined; //set the password undefined
    res.cookie("token", token, cookieOptions);//set the token into the cookie

    //if everything is fine
    res.status(200).json({
      success: true,
      message: "User successfully registered",
      data : user

    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

const login = async (req, res, next) => {
  try {
    //getting the fields from the request
    const { email, password } = req.body;

    //if any fields are empty
    if (!email || !password) {
      return next(new AppError("All fields are required 🙄", 400));
    }

    //find the user using the email and password fields
    const user = await User.findOne({ email }).select("+password");
    //if the user is not found
    if (!user) {
      return next(new AppError("Invalid Credential 🫥", 404)); // 404 for Not Found
    }

    //compare the password (hashed) in userschema
    if (!(await user.comparePassword(password))) {
      return next(new AppError("Invalid Credential 🫥", 401));
    }

    //if everything is fine
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
    //set the cookieOption for logging out here this is cookieoption not cookieoptions
    const cookieOption = {
      expires: new Date(), // current expiry date
      httpOnly: true, //  not able to modify  the cookie in client side
    };

    // return response with cookie without token
    res.cookie("token", null, cookieOption);

    //if everything is fine
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
    //userId from JWTAUTh middleware
    const userId = req.user.id;

    //find the user in db
    const user = await User.findById(userId);
  //if the user is not found
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

     //find the user in db
    const user = await User.findOne({ email });
    //if the user is not found
    if (!user) {
      return next(new AppError("User does not exists 🙄", 400));
    }

    //generating the reset token
    const resetToken = await user.generateResetToken();

    //save the reset token
    await user.save();

    //generating the rest password url
    const resetPassowordUrl =
      await `${req.protocol}://${req.hostname}/api/reset-password/${resetToken}`; //req.protocol = 'http or https'

    //defining the subject and message fields for the mail
    const subject = "reset password";
    const message = `You can reset your password by clicking here: <a href="${resetPassowordUrl}" target="_blank">Reset your password</a>`;
    
    //send the url to the mail
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
    //if any fields are empty
    if (!password) {
      return next(new AppError("All fields are required 🙄", 400));
    }

    //generating forgot password token
    const forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    //find the user in db
    const user = await User.findOne({
      forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    //if the user is not found
    if (!user) {
      return next(new AppError("Token is invalid or expired", 400));
    }

    //hashing the password again
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
    //if any fields are empty
    if (!oldPassword || !newPassword) {
      return next(new AppError("All fields are required 🙄", 400));
    }

    //id from jwtAuth middleware
    const userId = req.user.id;
    const user = await User.findById(userId).select("+password");

    //if user doe not exists
    if (!user) {
      return next(new AppError("User does not exists 🙄", 400));
    }

    //check if the old pasword matches
    const isPassMatch = await user.comparePassword(oldPassword);
    if (!isPassMatch) {
      return next(new AppError("Old-password does not matching 🙄", 400));
    }

    //set the new password
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

 //update user 
const updateUser = async (req, res, next) => {
  try {
    
    const {fullname} = req.body;
    //if any fields are empty
    if (!fullname) {
      return next(new AppError("All fields are required 🙄", 400));
    }
    
    //id from jwtAuth middleware
    const userId = req.user.id;
    const user = await User.findById(userId)
    if (!user) {
      return next(new AppError("User does not exists 🙄", 400));
    }

    //set the new name
    user.fullname = fullname;

    //if req.file to update delete current file then rest is same as in register
    if (req.file){
      try {
      // delete the old img from the cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar.public_id)

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
  
       fs.rm(`../uploads/${req.file.filename}`)
  
       } catch (error) {
        return next(new AppError("something went wrong", 400));
       }
    }
    res.status(200).json({
      success: true,
      message: "Profile has been Updated😊",
      data: user,
    });
  } catch (error) {
    console.log(error.message)
    return next(new AppError("Internal Server Error", 500));
  }
}

export {
  register,
  login,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser
};
