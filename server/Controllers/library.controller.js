import Library from "../Models/library.schema.js";
import AppError from "../Utills/appError.js";

// create a new bookdetails
const createBookDetails = async (req, res, next) =>{
   try {
    const {bookName, description, writer, numberOfBooks, category} = req.body

    //if any fields are empty
    if (!bookName || !description || !writer || !numberOfBooks || !category) {
        return next(new AppError("Every fields are required", 400));
    }

    //create a new bookdetails
    const bookDetails = await Library.create({
        bookName,
        description,
        writer,
        numberOfBooks,
        category
    })

    //if the book is already exist
    const bookAlreadyExists = await Library.findOne({ bookName})
    if(bookAlreadyExists){
        return next(new AppError("Book is already exist", 400));
    }

    //if any prblm while creating a new user
    if (!bookDetails) {
        return next(new AppError("Please try again", 400));
    }

    // run only if user send a file

    //if everything is fine
    res.status(200).json({
        success: true,
        message: "Bookdetails created successfully ",
        data : bookDetails
  
      });

   } catch (error) {
    console.log("error" + error.message)
    return next(new AppError("Internal Server Error", 500));
   }
}


export {
    createBookDetails
}