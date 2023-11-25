import React from "react";
import LayoutOther from "../../Layout/LayoutOther";
import Card from "../../Components/Library/Card";
import { useSelector } from "react-redux";
import Cart from "../../Components/Cart";

const LikeBooks = () => {
  const { favouriteItem } = useSelector((state) => state.library);
  console.log(favouriteItem);
  return (
    <LayoutOther>
      <section className="flex flex-col my-10 items-center justify-center gap-10">
        <label className=" text-4xl text-[#269d8b] uppercase font-bold font-serif tracking-[0.2em]">
          Favourite Books
        </label>
        <div className="flex flex-wrap gap-12 items-center justify-center">
          {favouriteItem &&
            favouriteItem.map((book) => {
              return <Card {...book} key={book._id} data={book} />;
            })}
        </div>
      </section>
    </LayoutOther>
  );
};

export default LikeBooks;
