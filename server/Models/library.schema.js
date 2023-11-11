import {model, Schema } from "mongoose";

const librarySchema = new Schema({
    bookName: {
        type : String,
        required : [true, "Name of the book is required"],
        minlength : [4, "Name must be at least 4 characters"],
        maxlength : [25, "Name cant not exceed 25 characters"],
        trim : true,
        unique : [true, "Book Name must be unique"]
    },
    description: {
        type : String,
        required : [true, "Description of the book is required"],
        minlength : [8, "Description must be at least 4 characters"],
        maxlength : [55, "Description cant not exceed 25 characters"],
        trim : true,
    },
    writer : {
        type : String,
        required : [true, "writer of the book is required"],
        trim : true
    },
    numberOfBooks : {
        type : String,
        required : [true, "writer of the book is required"],
        trim : true
    },
    thumbnail : {
        public_id: {
            type: String,
          },
          secure_url: {
            type: String,
          },
    },
    category : {
        type : String,
        required : [true, "Category of the book is required"],
    }
},{
    timestamps : true
})

const Library = model('library', librarySchema)

export default Library;