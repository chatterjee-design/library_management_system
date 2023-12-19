import React, { useEffect, useState } from "react";
import Card from "../../Components/Library/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../Redux/Slices/library.slice";

import Loader1 from "../Loader/Loader1";
import Layout from "../../Layout/Layout";

const GetAllBooks = () => {

  const dispatch = useDispatch();
  //Extract libraryData state from library slice & this state.books is getting from store.js
  const { libraryData, query, loading } = useSelector((state) => state.library);

  //fetch all books from library slice
  const actionResult = async () => {
    await dispatch(getAllBooks());
  };

  useEffect(() => {
    actionResult();
  }, [query]);

  //filter books for search query
  const filteredBooks = libraryData.filter((book) =>
    book.bookName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Layout>
      <section className="flex flex-col my-10 items-center justify-center gap-10">
        <label className=" text-4xl text-[#269d8b] uppercase font-bold font-serif tracking-[0.2em]">
          books
        </label>
        {loading ? (
          <Loader1 />
        ) : (
          <div className="flex flex-wrap gap-12 items-center justify-center">
            {filteredBooks.length === 0 ? (
              <div className="h-[40vh] w-[70vw] flex items-center justify-center">
                <label className=" text-lg text-[#5c269d] text-center uppercase font-bold font-serif tracking-[0.2em]">
                  No matching books found
                </label>
              </div>
            ) : (
              filteredBooks.map((book) => (
                <Card {...book} key={book._id} data={book} />
              ))
            )}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default GetAllBooks;
