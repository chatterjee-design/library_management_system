import React from 'react'
import { Link } from "react-router-dom";
import cat from '../assets/cat.jpg'

const ErrorPage = ({statusCode, errorMessage}) => {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
        <div className='flex items-center justify-between w-[90%] h-screen'>
            <div className='w2/3 flex flex-col justify-center items-center'>
      <h1 className=' text-4xl  text-center font-mono tracking-[.24em]'>OOPS! <span className='text-5xl font-serif text-base-300'>{statusCode} </span></h1>
      <p className='text-5xl mt-4 text-center font-serif tracking-widest'>{errorMessage}</p>
      <Link to='/' className="btn btn-primary mt-7 font-serif tracking-widest">Homepage</Link>
      </div>
      <img src={cat} alt="cat" className='w-1/2' />
      </div>
    </div>
  )
}

export default ErrorPage
