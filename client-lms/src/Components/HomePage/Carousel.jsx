import React from 'react'
import { Link } from "react-router-dom";

const Carousel = ({img, category}) => {
  return (
    <>
       <div className="carousel-item cursor-pointer">
          <div className="card card-compact w-80 bg-base-100 shadow-xl opacity-0 animate-fade-in-left">
            <figure>
              <img
                src={img}
                alt="books"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title tracking-[.24em] font-light  font-serif">{category} books</h2>
              <div className="card-actions justify-end">
                <Link to={`/category/${category}`} className="btn bg-[#5c269d] text-white tracking-[0.4em] btn-primary">View More</Link>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Carousel
