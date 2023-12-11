import AppError from "../Utills/appError.js";
import sendEmail from "../Utills/sendMail.js";

const contactUs = async (req, res, next) => {
    try {
        const {name, email, message} = req.body;

    if(!email, !name, !message) {
        return next(new AppError("Every fields are required", 400));
    }

    try {
        const subject = 'Contact Us From ' 
        const textMessage = `${name} - ${email} <br/> ${message}`

        await sendEmail(subject, textMessage, process.env.CONTACT_US_EMAIL)
        res.status(200).json({
            success: true,
            message: "succesfull send the response 😊",
          });

    } catch (error) {
        return next(new AppError("Something Went Wrong", 500));
    }
    } catch (error) {
        return next(new AppError("Internal Server Error", 500));
    }
}

export {contactUs}