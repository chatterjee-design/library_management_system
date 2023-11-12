import Library from "../Models/library.schema.js";
import AppError from "../Utills/appError.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

// create a new bookdetails
const createBookDetails = async (req, res, next) => {
  try {
    const { bookName, description, writer, numberOfBooks, category, publisher } = req.body;

    //if any fields are empty
    if (!bookName || !description || !writer || !numberOfBooks || !category || !publisher) {
      return next(new AppError("Every fields are required", 400));
    }

    //if the book is already exist
    const bookAlreadyExists = await Library.findOne({ bookName });
    if (bookAlreadyExists) {
      return next(new AppError("Book is already exist", 400));
    }

    //create a new bookdetails
    const bookDetails = await Library.create({
      bookName,
      description,
      writer,
      numberOfBooks,
      category,
      publisher,
      thumbnail: {
        public_id: bookName,
        secure_url:
          "https://img.freepik.com/free-photo/front-view-stacked-books-diploma-earth-globe-with-copy-space-education-day_23-2149241048.jpg?w=360&t=st=1699683504~exp=1699684104~hmac=50e478cca7eb7964e58211cb71a49247a02d95a80cb2089138bc27ac9bd1af5d",
      },
    });

    //if any prblm while creating a new user
    if (!bookDetails) {
      return next(new AppError("Please try again", 400));
    }

    // run only if user send a file
    if (req.file) {
      try {
        const file = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "server",
          width: 1000,
          height: 1500,
          gravity: "faces",
          crop: "fill",
        });

        if (file) {
          // Initialize the thumbnail property if it doesn't exist
          bookDetails.thumbnail = bookDetails.thumbnail || {};
          // Set the properties
          bookDetails.thumbnail.public_id = file.public_id;
          bookDetails.thumbnail.secure_url = file.secure_url;
        }

        await bookDetails.save();

        //delete uploads file after save completes in cloudinary
        fs.rm(`../uploads/${req.file.filename}`);
      } catch (error) {
        return next(new AppError("something went wrong", 400));
      }
    }

    //if everything is fine
    res.status(200).json({
      success: true,
      message: "Bookdetails created successfully ",
      data: bookDetails,
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

//get all book details
const getAllBookDetails = async (req, res, next) => {
  try {
    //get all book details
    const books = await Library.find({});

    //if everything is fine
    res.status(200).json({
      success: true,
      message: "Bookdetails get successfully ",
      books,
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

// get a single book details
const getBookDetails = async (req, res, next) => {
  try {
    const id = req.params._id;

    //get book details from the params
    const book = await Library.findById(id);

    //if book is not found
    if (!book) {
      return next(new AppError("failed to fetch the book details", 404));
    }

    //if everything is fine
    res.status(200).json({
      success: true,
      message: "Bookdetails get successfully ",
      book,
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

//update a single book details
const updateBookDetails = async (req, res, next) => {
  try {
    const { bookName, description, writer, numberOfBooks, category, publisher } = req.body;

    //get book id from the params
    const id = req.params._id;
    const bookDetails = await Library.findByIdAndUpdate(id);

    // if book is already exists
    const bookAlreadyExists = await Library.findOne({ bookName });

    //if book is not found in the db
    if (!bookDetails) {
      return next(new AppError("failed to fetch the book details", 404));
    }

    //update book details
    if (bookName) {
      if (bookAlreadyExists) {
        return next(new AppError("Name of the book is already exists", 404));
      }
      bookDetails.bookName = bookName;
    }
    if (description) {
      bookDetails.description = description;
    }
    if (numberOfBooks) {
      bookDetails.numberOfBooks = numberOfBooks;
    }
    if (category) {
      bookDetails.category = category;
    }
    if (writer) {
      bookDetails.writer = writer;
    }
    if (publisher) {
      bookDetails.publisher = publisher;
    }

    await bookDetails.save();

    //update book cover
    if (req.file) {
      try {
        // delete the old img from the cloudinary
        await cloudinary.v2.uploader.destroy(bookDetails.thumbnail.public_id);

        //upload the new image to the cloudinary
        const file = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "server",
          width: 1000,
          height: 1500,
          gravity: "faces",
          crop: "fill",
        });

        if (file) {
          // Initialize the thumbnail property if it doesn't exist
          bookDetails.thumbnail = bookDetails.thumbnail || {};
          // Set the properties
          bookDetails.thumbnail.public_id = file.public_id;
          bookDetails.thumbnail.secure_url = file.secure_url;
        }

        await bookDetails.save();

        //delete uploads file after save completes in cloudinary
        fs.rm(`../uploads/${req.file.filename}`);
      } catch (error) {
        return next(new AppError("something went wrong", 400));
      }
    }

    res.status(200).json({
      success: true,
      message: "Book Details has been Updated😊",
      data: bookDetails,
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

//delete book details
const deleteBookDetails = async (req, res, next) => {
  try {
    const id = req.params._id;

    //get book details from the params
    const book = await Library.findByIdAndDelete(id);

    //if book is not found
    if (!book) {
      return next(new AppError("failed to fetch the book details", 404));
    }

    //if everything is fine
    res.status(200).json({
      success: true,
      message: "Bookdetails deleted successfully ",
    });
  } catch (error) {
    return next(new AppError("Internal Server Error", 500));
  }
};

export {
  createBookDetails,
  getAllBookDetails,
  getBookDetails,
  updateBookDetails,
  deleteBookDetails,
};
