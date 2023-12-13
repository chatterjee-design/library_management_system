import React, { useEffect, useState } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import {
  getBookDetails,
  updateBookDetails,
} from "../../Redux/Slices/library.slice";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const UpdateBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();

  const [editDetails, setEditDetails] = useState({
    editBookName: false,
    editWriter: false,
    editDescription: false,
    editPublisher: false,
    editNumOfBooks: false,
    editCategory: false,
  });
  const [selectedFileName, setSelectedFileName] = useState("");
  const [editBookDetails, setEditBookDetails] = useState({
    bookName: "",
    writer: "",
    description: "",
    category: "",
    publisher: "",
    numberOfBooks: "",
    thumbnail: "",
  });

  const { bookDetails, loading } = useSelector((state) => state.library);

  const actionResult = async () => {
    await dispatch(getBookDetails(_id));
  };

  useEffect(() => {
    actionResult();
  }, []);

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setEditBookDetails({
      ...editBookDetails,
      [name]: value,
    });
  };

  function handleInputFile(event) {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setEditBookDetails({
        ...editBookDetails,
        thumbnail: file,
      });

      //filereader will read the file and show it
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", function () {
        setSelectedFileName(this.result);
      });
    }
    setSelectedFileName(file ? file.name : "");
    toast.success(file ? file.name : "");
  }

  const hndleEditBook = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("bookName", editBookDetails.bookName);
    formData.append("writer", editBookDetails.writer);
    formData.append("description", editBookDetails.description);
    formData.append("category", editBookDetails.category);
    formData.append("publisher", editBookDetails.publisher);
    formData.append("numberOfBooks", editBookDetails.numberOfBooks);
    formData.append("thumbnail", editBookDetails.thumbnail);

    try {
      const actionResult = await dispatch(
        updateBookDetails({
          _id,
          data: formData,
        })
      );
      const response = actionResult?.payload;
      if (response?.success) {
        navigate(`/library/books/${_id}`);
        setEditBookDetails({
          bookName: "",
          writer: "",
          description: "",
          category: "",
          publisher: "",
          numberOfBooks: "",
          thumbnail: "",
        });
        toast.success("Book updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <LayoutOther>
      <div className="flex flex-col justify-center items-center">
        <form
          action="/submit-form"
          encType="application/json"
          onSubmit={hndleEditBook}
          className="w-full"
        >
          <div className="hero  min-h-[78.7vh] flex-1 bg-base-100 ">
            <div className="hero-content md:p-1 flex-col lg:flex-row-reverse items-center justify-between md:w-[80%]">
              <label htmlFor="fileInput" className="cursor-pointer w-[100%]">
                {selectedFileName ? (
                  <img
                    src={selectedFileName}
                    alt="bookCover"
                    className="h-96 cursor-pointer "
                  />
                ) : (
                  <img
                    src={bookDetails?.thumbnail?.secure_url}
                    alt="bookCover"
                    className="h-96 cursor-pointer "
                  />
                )}
              </label>
              <input
                className=" hidden"
                aria-describedby="file_input_help"
                id="fileInput"
                type="file"
                name="fileInput"
                onChange={handleInputFile}
              />
              <div className="flex flex-col min-w-[60%]">
                <div className="flex">
                  {editDetails.editBookName ? (
                    <input
                      type="text"
                      id="bookName"
                      name="bookName"
                      className="input-bordered input h-10 shadow-sm hover:shadow-none cursor-pointer"
                      value={editBookDetails?.bookName}
                      onChange={handleUserInputChange}
                    />
                  ) : (
                    <h1 className="text-4xl font-thin font-serif tracking-[0.2em]">
                      {bookDetails?.bookName}
                    </h1>
                  )}
                  <FaRegEdit
                    className="self-end text-gray-500"
                    onClick={() =>
                      setEditDetails({
                        ...editDetails,
                        editBookName: !editDetails.editBookName,
                      })
                    }
                  />
                </div>

                <div className="flex mt-2 gap-2 md:w-[80%] items-center ">
                  {editDetails?.editWriter ? (
                    <input
                      type="text"
                      id="writer"
                      name="writer"
                      className="input-bordered input h-10 shadow-sm hover:shadow-none cursor-pointer"
                      value={editBookDetails?.writer}
                      onChange={handleUserInputChange}
                    />
                  ) : (
                    <p className=" text-slate-800 w-fit font-mono ">
                      -{bookDetails?.writer}
                    </p>
                  )}

                  <FaRegEdit
                    className="text-gray-500"
                    onClick={() =>
                      setEditDetails({
                        ...editDetails,
                        editWriter: !editDetails.editWriter,
                      })
                    }
                  />
                </div>
                <div className="flex my-4 gap-3">
                  {editDetails?.editDescription ? (
                    <textarea
                      className="input-bordered input w-[80%] h-28 "
                      id="description"
                      name="description"
                      value={editBookDetails?.description}
                      onChange={handleUserInputChange}
                    />
                  ) : (
                    <p className=" text-slate-500 font-mono md:w-[80%]">
                      {bookDetails?.description}
                    </p>
                  )}

                  <FaRegEdit
                    className="self-end text-gray-500"
                    onClick={() =>
                      setEditDetails({
                        ...editDetails,
                        editDescription: !editDetails.editDescription,
                      })
                    }
                  />
                </div>
                <div className="flex gap-5 mb-7">
                  <div className="flex flex-col font-bold font-serif tracking-wider">
                    <h3>Publisher</h3>
                    <h3>Number Of Books</h3>
                    <h3>Genre</h3>
                  </div>
                  <div className="flex flex-col font-bold font-mono">
                    <h3>:</h3>
                    <h3>:</h3>
                    <h3>:</h3>
                  </div>
                  <div className="flex flex-col font-mono font-extralight tracking-wider">
                    <div className="flex">
                      {editDetails?.editPublisher ? (
                        <input
                          type="text"
                          id="publisher"
                          name="publisher"
                          className="border-b"
                          value={editBookDetails?.publisher}
                          onChange={handleUserInputChange}
                        />
                      ) : (
                        <h3>{bookDetails?.publisher}</h3>
                      )}

                      <FaRegEdit
                        className="self-center mx-2 text-gray-500"
                        onClick={() =>
                          setEditDetails({
                            ...editDetails,
                            editPublisher: !editDetails.editPublisher,
                          })
                        }
                      />
                    </div>
                    <div className="flex">
                      {editDetails.editNumOfBooks ? (
                        <input
                          type="text"
                          id="numberOfBooks"
                          name="numberOfBooks"
                          className="border-b"
                          value={editBookDetails?.numberOfBooks}
                          onChange={handleUserInputChange}
                        />
                      ) : (
                        <h3>{bookDetails?.numberOfBooks}</h3>
                      )}

                      <FaRegEdit
                        className="self-center mx-2 text-gray-500"
                        onClick={() =>
                          setEditDetails({
                            ...editDetails,
                            editNumOfBooks: !editDetails.editNumOfBooks,
                          })
                        }
                      />
                    </div>
                    <div className="flex">
                      {editDetails?.editCategory ? (
                        <input
                          type="text"
                          id="category"
                          name="category"
                          className="border-b"
                          value={editBookDetails?.category}
                          onChange={handleUserInputChange}
                        />
                      ) : (
                        <h3>{bookDetails?.category}</h3>
                      )}

                      <FaRegEdit
                        className="self-center mx-2 text-gray-500"
                        onClick={() =>
                          setEditDetails({
                            ...editDetails,
                            editCategory: !editDetails.editCategory,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <button
                    type="submit"
                    className="btn bg-[#5c269d] text-white tracking-[0.3em] btn-primary"
                    disabled={loading}
                  >
                    Save Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </LayoutOther>
  );
};

export default UpdateBook;
