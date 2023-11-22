import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { createBookDetails } from "../../Redux/Slices/library.slice";
import { useDispatch } from "react-redux";

const CreateBookDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedFileName, setSelectedFileName] = useState("");

  const [bookDetails, setBookDetails] = useState({
    bookName: "",
    writer: "",
    description: "",
    category: "",
    publisher: "",
    numberOfBooks: "",
    thumbnail: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBookDetails({
      ...bookDetails,
      [name]: value,
    });
  };
  const handleInputFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBookDetails({
        ...bookDetails,
        thumbnail: file,
      });
    }
    setSelectedFileName(file ? file.name : "");
    toast.success(file ? file.name : "");
  };

  const addBook = async (e) => {
    e.preventDefault();

    if (
      !bookDetails.bookName ||
      !bookDetails.writer ||
      !bookDetails.description ||
      !bookDetails.category ||
      !bookDetails.publisher ||
      !bookDetails.numberOfBooks ||
      !bookDetails.thumbnail
    ) {
      toast.error("Every field is required");
    }
    const formData = new FormData();

    // Append form fields to FormData object
    formData.append("bookName", bookDetails.bookName);
    formData.append("writer", bookDetails.writer);
    formData.append("description", bookDetails.description);
    formData.append("category", bookDetails.category);
    formData.append("publisher", bookDetails.publisher);
    formData.append("numberOfBooks", bookDetails.numberOfBooks);
    formData.append("thumbnail", bookDetails.thumbnail);

    try {
      const actionResult = await dispatch(createBookDetails(formData));
      const response = actionResult.payload;
      if (response?.success) {
        navigate("/");
        setBookDetails({
          bookName: "",
          writer: "",
          description: "",
          category: "",
          publisher: "",
          numberOfBooks: "",
          thumbnail: "",
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex sitems-center h-screen w-screen justify-center bg-login bg-cover bg-no-repeat opacity-0 animate-fade-in-left ">
        <div className=" backdrop-blur-sm h-screen w-screen flex items-center justify-center">
          <div className="flex flex-col items-center justify-between py-5 min-h-fit h-[75%] bg-white w-[80%] md:w-[75%]">
            <h1 className="uppercase font-light tracking-[.35em] sm:text-3xl font-serif text-[#269d8b]">
              Create Book Details
            </h1>
            <form
              noValidate
              encType="multipart/form-data"
              action="/submit-form"
              method="POST"
              onSubmit={addBook}
              className=" flex flex-col items-center justify-evenly w-[85%] h-[100%] mt-5 "
            >
              <div className="flex w-full justify-betwwen items-center gap-5">
                <div className="flex flex-col  w-[100%] justify-center items-start gap-1">
                  <label
                    className="font-mono tracking-[0.15em] text-xs font-bold"
                    htmlFor="bookName"
                  >
                    Book's Name
                  </label>
                  <input
                    placeholder="Book's Name"
                    className="border-[1px] py-1 w-full"
                    type="text"
                    id="bookName"
                    name="bookName"
                    required
                    onChange={handleInputChange}
                    value={bookDetails.bookName}
                  />
                </div>

                <div className="flex flex-col w-[100%] justify-center items-start gap-1">
                  <label
                    className="font-mono tracking-[0.15em] text-xs font-bold "
                    htmlFor="writer"
                  >
                    Writer
                  </label>
                  <input
                    placeholder="Writer's Name"
                    className="border-b w-full border-[1px] py-1"
                    type="text"
                    id="writer"
                    name="writer"
                    required
                    onChange={handleInputChange}
                    value={bookDetails.writer}
                  />
                </div>
              </div>
              <div className="flex flex-col  w-[100%] justify-center items-start gap-1">
                <label
                  className="font-mono tracking-[0.15em] text-xs font-bold"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  placeholder="Description..."
                  className="border-[1px] py-1 w-full"
                  type="text"
                  id="description"
                  name="description"
                  required
                  onChange={handleInputChange}
                  value={bookDetails.description}
                />
              </div>
              <div className="flex w-full justify-center items-center gap-5">
                <div className="flex flex-col w-[100%] justify-center items-start gap-1">
                  <label
                    className="font-mono tracking-[0.15em] text-xs font-bold"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <input
                    placeholder="Category"
                    className="border-[1px] py-1 w-full"
                    type="category"
                    id="category"
                    name="category"
                    required
                    onChange={handleInputChange}
                    value={bookDetails.category}
                  />
                </div>
                <div className="flex flex-col w-[100%] justify-center items-start gap-1">
                  <label
                    className="font-mono tracking-[0.15em] text-xs font-bold"
                    htmlFor="numberOfBooks"
                  >
                    Number of Books
                  </label>
                  <input
                    placeholder="Number of Books"
                    className="border-[1px] py-1 w-full "
                    type="number"
                    id="numberOfBooks"
                    name="numberOfBooks"
                    required
                    onChange={handleInputChange}
                    value={bookDetails.numberOfBooks}
                  />
                </div>

                <div className="flex flex-col w-[100%] justify-center items-start gap-1">
                  <label
                    className="font-mono tracking-[0.15em] text-xs font-bold"
                    htmlFor="publisher"
                  >
                    Publisher
                  </label>
                  <input
                    placeholder="Publisher's Name"
                    className="border-b w-full border-[1px] py-1"
                    type="text"
                    id="publisher"
                    name="publisher"
                    required
                    onChange={handleInputChange}
                    value={bookDetails.publisher}
                  />
                </div>
              </div>
              <div className="flex  w-[100%] justify-start items-center gap-3">
                <label
                  className="font-mono tracking-[0.15em] w-fit cursor-pointer border-2 border-[#269d8b] px-2 hover:bg-[#269d8b] hover:text-white text-s rounded-sm"
                  htmlFor="fileInput"
                >
                  Choose file
                </label>
                <input
                  className=" hidden"
                  aria-describedby="file_input_help"
                  id="fileInput"
                  type="file"
                  name="fileInput"
                  onChange={handleInputFile}
                  defaultValue={
                    bookDetails.thumbnail ? bookDetails.thumbnail.name : ""
                  }
                  required
                />
                <span className="text-xs font-mono"> {selectedFileName} </span>
              </div>

              <button
                className="btn bg-[#5c269d] text-white tracking-[0.3em] btn-primary"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBookDetails;
