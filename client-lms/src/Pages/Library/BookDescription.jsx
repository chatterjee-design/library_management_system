import React, { useEffect } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetails } from "../../Redux/Slices/library.slice";

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

  return (
    <LayoutOther>
      <div className="flex flex-col justify-center items-center h-[78.7vh]">
      <div className="hero  min-h-fit bg-base-100 ">
        <div className="hero-content flex-col lg:flex-row-reverse items-center justify-between">
          <img src={bookDetails?.thumbnail?.secure_url} alt="bookCover" className="h-96 cursor-pointer" />
          <div>
            <h1 className="text-4xl font-thin font-serif tracking-[0.2em]">{bookDetails?.bookName}</h1>
            <p className="py-6 text-slate-500 font-mono md:w-[70%]">
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
            <h3>{bookDetails.publisher}</h3>
              <h3>{bookDetails?.numberOfBooks}</h3>
              <h3>{bookDetails?.category}</h3>
            </div>
            </div>
            <button className="btn btn-primary">BORROW</button>
          </div>
        </div>
      </div>
      </div>
    </LayoutOther>
  );
};

export default BookDescription;
