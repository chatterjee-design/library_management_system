import React from 'react'
import cat from '../assets/cat.jpg'

const ErrorPage = () => {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
        <div className='flex items-center justify-between w-[90%] h-screen'>
            <div className='w2/3 flex flex-col justify-center items-center'>
      <h1 className=' text-4xl  text-center font-mono tracking-[.24em]'>OOPS! <span className='text-5xl text-base-300'>404 </span></h1>
      <p className='text-5xl mt-4 text-center font-serif tracking-widest'>Page Not Found</p>
      <button className="btn btn-primary mt-7 font-serif tracking-widest">Homepage</button>
      </div>
      <img src={cat} alt="cat" className='w-1/2' />
      </div>
    </div>
  )
}

export default ErrorPage
