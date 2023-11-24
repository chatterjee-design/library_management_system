import React, { useEffect } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, getBookDetails } from "../../Redux/Slices/library.slice";

const BookDescription = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const { bookDetails } = useSelector((state) => state.library);

  const actionResult = async () => {
    await dispatch(getBookDetails(_id));
  };

  useEffect(() => {
    actionResult();
  }, []);

  const addToCart = () => {
    const bookDesc = bookDetails
    dispatch(addCartItem(bookDesc))
  }
  return (
    <LayoutOther >
      <div className="flex flex-col justify-center items-center h-[78.7vh]">
      <div className="hero  min-h-fit bg-base-100 ">
        <div className="hero-content flex-col lg:flex-row-reverse items-center justify-between md:w-[80%]">
          <img src={bookDetails?.thumbnail?.secure_url} alt="bookCover" className="h-96 cursor-pointer" />
          <div>
            <h1 className="text-4xl font-thin font-serif tracking-[0.2em]">{bookDetails?.bookName}</h1>
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
            <Link onClick={addToCart} className="btn bg-[#5c269d] text-white tracking-[0.3em] btn-primary"
              >
               Add to cart
              </Link>
              <Link to='/cart' className="btn border-1 bg-transparent text-black border-[#5c269d] hover:bg-[#5c269d] hover:text-white tracking-[0.3em] btn-primary">
              Go to cart
            </Link>
              </div>
          </div>
        </div>
      </div>
      </div>
    </LayoutOther>
  );
};

export default BookDescription;
