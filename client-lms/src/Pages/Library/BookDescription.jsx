import React, { useEffect, useState } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavouriteItem,
  deleteBookDetails,
  getBookDetails,
} from "../../Redux/Slices/library.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import toast from "react-hot-toast";
import { addCartItem, getCartItem } from "../../Redux/Slices/cartSlice";
import LoaderPage2 from "../Loader/Loader2";

const BookDescription = () => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();
  const { bookDetails, loading } = useSelector((state) => state.library);
  const { isLoading } = useSelector((state) => state.cart);
  const [cartDetails, setCartDetails] = useState({
    bookId: _id,
  });

  const hndleBookDetails = async () => {
    await dispatch(getBookDetails(_id));
  };

  useEffect(() => {
    hndleBookDetails();
  }, []);

  const addToCart = async (e) => {
    e.preventDefault();

    if (!cartDetails.bookId) {
      toast.error("evert field is required");
    }
    try {
      const response = await dispatch(addCartItem(cartDetails));

      if (response?.payload?.success) {
        setCartDetails({
          bookId: _id,
        });
        await dispatch(getCartItem());
        toast.success("Item added successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const isFavourite = () => {
    setIsLiked(!isLiked);
    const bookDesc = bookDetails;
    dispatch(addFavouriteItem(bookDesc));
  };

  const hndleDeleteBookDetails = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deleteBookDetails(_id));
      navigate("/library/books");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <LayoutOther>
      <div className="flex flex-col justify-center items-center">
        {loading ? (
          <LoaderPage2 />
        ) : (
          <div className="hero  min-h-[78.7vh] flex-1 bg-base-100 ">
            <div className="hero-content md:p-1 flex-col lg:flex-row-reverse items-center justify-between md:w-[80%]">
              <img
                src={bookDetails?.thumbnail?.secure_url}
                alt="bookCover"
                className="h-96 w-72 cursor-pointer"
              />
              <div className="flex flex-col min-w-[70%]">
                <h1 className="text-4xl text-[#269d8b]  font-thin font-serif tracking-[0.2em]">
                  {bookDetails?.bookName}
                </h1>
                <div className="w-full flex items-center">
                  <p className="pt-2 text-slate-800 font-mono md:w-[80%]">
                    -{bookDetails?.writer}
                  </p>
                </div>
                <p className="py-6 text-slate-500 font-mono md:w-[80%]">
                  {bookDetails?.description}
                </p>
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
                    <h3>{bookDetails?.publisher}</h3>
                    <h3>{bookDetails?.numberOfBooks}</h3>
                    <h3>{bookDetails?.category}</h3>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <button
                    onClick={addToCart}
                    disabled={isLoading}
                    className="btn bg-[#5c269d] text-white tracking-[0.3em] btn-primary"
                  >
                    Add to cart
                  </button>
                  <Link
                    to="/cart"
                    className="btn border-1 bg-transparent text-black border-[#5c269d] hover:bg-[#5c269d] hover:text-white tracking-[0.3em] btn-primary"
                  >
                    Go to cart
                  </Link>
                  <Link
                    to={`/admin/library/update/${_id}`}
                    data-tip="Edit"
                    className="tooltip hover:text-gray-500 md:text-2xl  "
                  >
                    <FaRegEdit />
                  </Link>
                  <button
                    data-tip="Delete"
                    onClick={hndleDeleteBookDetails}
                    className="tooltip hover:text-gray-500 md:text-2xl  "
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
                <div
                  onClick={isFavourite}
                  className="self-end text-xl md:text-3xl md:mx-10 mr-2 cursor-pointer  relative bottom-10"
                >
                  {isLiked ? (
                    <FontAwesomeIcon
                      icon={solidHeart}
                      className="text-red-800 self-end"
                    />
                  ) : (
                    <FontAwesomeIcon icon={regularHeart} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutOther>
  );
};

export default BookDescription;
