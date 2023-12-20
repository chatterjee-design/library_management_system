import React, { useEffect } from "react";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByCategory } from "../../Redux/Slices/library.slice";
import { useParams } from "react-router-dom";
import Loader1 from "../Loader/Loader1";
import Card from "../../Components/Library/Card";

const BooksByCategory = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { loading, libraryData } = useSelector((state) => state.library);

  //fetch books by category from the library slice
  const getBooks = () => {
    dispatch(getBooksByCategory(category));
  };

  useEffect(() => {
    getBooks()
  }, [category]);

  return (
    <Layout>
      <section className="flex flex-col my-10 items-center justify-center gap-10">
        <label className=" text-4xl text-[#269d8b] uppercase font-bold font-serif tracking-[0.2em]">
         {category} books
        </label>
        {loading ? (
          <Loader1 />
        ) : libraryData.length === 0 || !libraryData ? (
          <div className="min-h-[68.8vh] md:min-h-[40vh] flex justify-center items-center">
            <label className=" text-lg text-[#5c269d] text-center uppercase font-bold font-serif tracking-[0.2em]">
              No matching books found
            </label>
          </div>
        ) : (
          <div className="flex flex-wrap gap-12 items-center justify-center">
            {libraryData.map((book) => (
              <Card {...book} key={book._id} data={book} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default BooksByCategory;
