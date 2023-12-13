import React from 'react'
import ourMissionImg from "../../assets/ourMissionImg.jpg";
import { Link } from 'react-router-dom'

const OurMission = () => {
  return (
    <div className='flex items-center justify-center my-10'>
      <div className="card  w-[85vw] lg:card-side bg-base-100 shadow-sd2 ">
          <figure className="lg:w-[58%] w-full md:flex">
            <img src={ourMissionImg} alt="Album" />
          </figure>
          <div className="card-body py-4 lg:w-[42%] flex-col flex items-center justify-center">
            <h2 className="card-title tracking-[.24em] text-3xl text-[#269d8b] font-light font-serif">
              About Us
            </h2>
            <div>
              <p className="font-serif text-justify tracking-[.05em] leading-loose">
                At{" "}
                <Link
                  to="/"
                  className="tracking-[.15em] sm:text-sm cursor-pointer text-[#5c269d]"
                >
                  Readsphere
                </Link>
                , our mission is to connect readers with the vast world of literature,
                 fostering a love for learning and exploration. We strive to create an accessible and 
                 user-friendly platform that empowers users to discover, engage, and share in the joy of reading.
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default OurMission
