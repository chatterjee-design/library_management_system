import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  const _id = data?._id;

  return (
    <>
      <div className="card card-compact cursor-pointer w-80 bg-base-100 shadow-xl opacity-0 animate-slide-in-left">
        <figure>
          <img src={data?.thumbnail?.secure_url} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title tracking-[.24em] font-light  font-serif">
            {data?.bookName}
          </h2>
          <div className="card-actions justify-end">
            <Link to={`/library/books/${_id}`} className="btn bg-[#5c269d] text-white tracking-[0.4em] btn-primary">
              View More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
