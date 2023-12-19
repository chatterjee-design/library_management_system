import React from "react";
import CardItem from "./CardItem";
import { Link } from "react-router-dom";

const MyOrdersCard = ({ data }) => {
  const books = data?.items;
  const _id = data?._id;

  // Function to format date as "1-12-2023"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Link
        to={`/order/details/${_id}`}
        className="flex cursor-pointer flex-col mb-10 px-10 pb-10 pt-5 items-center justify-center shadow-sd w-[90%]"
      >
        {books &&
          books.map((book) => {
            return <CardItem {...book} key={book._id} data={book} />;
          })}
        <div className="flex items-center justify-end self-end pr-10">
          <h1>Date of order : {formatDate(data?.orderDate)}</h1>
        </div>
      </Link>
    </>
  );
};

export default MyOrdersCard;
