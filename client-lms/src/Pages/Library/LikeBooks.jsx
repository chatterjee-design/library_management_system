import React, { useState } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import Card from "../../Components/Library/Card";
import { useSelector } from "react-redux";
import Loader1 from "../Loader/Loader1";

const LikeBooks = () => {

  const { favouriteItem, isLoading } = useSelector((state) => state.library);

  return (
    <LayoutOther>
      {favouriteItem.length === 0 ? (
            <div className="text-center font-mono min-h-[78.8vh] w-[100%] flex justify-center items-center flex-wrap flex-col">
              <h2 className="text-2xl text-[#5c269d] pt-4 font-serif tracking-widest">Your Favourites are empty</h2>
              <p >Please add books to your Favourites.</p>
            </div>
          ) : (
            <section className="flex min-h-[78.8vh] flex-col my-10 items-center justify-center gap-10">
            <label className=" text-4xl text-center text-[#269d8b] uppercase font-bold font-serif tracking-[0.2em]">
              Favourite Books
            </label>
            {isLoading ? (
              <Loader1 />
            ) : (
              <div className="flex flex-wrap gap-12 items-center justify-center">
                {favouriteItem &&
                  favouriteItem.map((book) => {
                    return <Card {...book} key={book._id} data={book} />;
                  })}
              </div>
            )}
          </section>
          )}

    </LayoutOther>
  );
};

export default LikeBooks;
