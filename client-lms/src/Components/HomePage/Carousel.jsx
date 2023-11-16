import React from 'react'

const Carousel = ({img, category}) => {


  return (
    <>
       <div className="carousel-item cursor-pointer">
          <div className="card card-compact w-80 bg-base-100 shadow-xl">
            <figure>
              <img
                src={img}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title tracking-[.24em] font-light  font-serif">{category}</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View More</button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Carousel
