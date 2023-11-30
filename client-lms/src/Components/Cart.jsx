import React from 'react'

const Cart = ({data}) => {
  return (
    <>
      <div className='flex items-center justify-between border-t border-b py-8  w-[94%]'>
        <div className='w-[33%] justify-center flex '>
            <img className=' w-40' src={data?.thumbnail?.secure_url} alt="bookCover" />
        </div>
        <div className='flex flex-col gap-1 w-[59%] self-start'>
            
            <h1 className='text-2xl font-mono tracking-[0.1em] font-extralight text-[#269d8b]'>{data?.bookName}</h1>
            <h3 className=' text-lg font-mono tracking-[0.1em] font-extralight text-slate-400'>{data?.writer}</h3>
            <div className="flex gap-4 mt-3">
            <div className="flex flex-col gap-3 text-sm font-bold font-serif tracking-wider">
              <h3>Publisher</h3>
              <h3>Number Of Books</h3>
              <h3>Genre</h3>
            </div>
            <div className="flex flex-col text-sm gap-3 font-bold font-mono">
              <h3>:</h3>
              <h3>:</h3>
              <h3>:</h3>
            </div>
            <div className="flex flex-col text-sm gap-3 font-mono font-extralight tracking-wider">
            <h3>{data?.publisher}</h3>
              <h3>{data?.numberOfBooks}</h3>
              <h3>{data?.category}</h3>
            </div>
            </div>
        </div>
        <div className='w-[8%] self-start flex justify-end'>
            $55
        </div>
      </div>
    </>
  )
}

export default Cart
