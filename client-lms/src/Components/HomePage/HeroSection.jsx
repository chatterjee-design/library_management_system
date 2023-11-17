import React from 'react'

const HeroSection = () => {
  return (
    <>
      <div className="flex flex-col  h-[78vh] bg-books bg-no-repeat bg-center bg-cover">
       <div className="flex h-full w-full items-center justify-center flex-col  md:w-[60%] backdrop-brightness-[50%] ">
        <h1 className=" text-[#f2efec] text-center font-mono uppercase text-2xl sm:text-3xl">
          Your Gateway to
          <span className=" text-white"> Infinite Books</span>
        </h1>
        <p className=" text-center font-serif text-xs tracking-[.14em] text-gray-300 mt-2">
          "Immerse yourself in Readify - where stories unfold and <br/>imagination
          take flight."
        </p>
        </div> 
      </div>
    </>
  )
}

export default HeroSection
