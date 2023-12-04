import React from 'react'

const CardItem = ({data}) => {
  return (
    <>
      <div className='flex flex-col md:flex-row items-center justify-center border-b py-5 w-[90%] md:w-[94%]'>
        <div className='md:w-[33%] w-[80%] justify-center items-center flex '>
            <img className='w-16' src={data?.bookId?.thumbnail?.secure_url} alt="bookCover" />
        </div>
        <div className='flex flex-col gap-1 w-[59%] md:my-0 my-5'>
            
            <h1 className='text-xl font-mono tracking-[0.1em] font-extralight text-[#269d8b]'>{data?.bookId?.bookName}</h1>
            <h3 className=' text-sm font-mono tracking-[0.1em] font-extralight text-slate-400'>{data?.bookId?.writer}</h3>
        </div>
      </div>
    </>
  )
}

export default CardItem
