import React, { useState } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import Card from "../../Components/Library/Card";
import { useSelector } from "react-redux";
import Loader1 from "../Loader/Loader1";

const LikeBooks = () => {

  const { favouriteItem, isLoading } = useSelector((state) => state.library);

  return (
    <LayoutOther>
      <section className="flex flex-col my-10 items-center justify-center gap-10">
        <label className=" text-4xl text-[#269d8b] uppercase font-bold font-serif tracking-[0.2em]">
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
    </LayoutOther>
  );
};

export default LikeBooks;
