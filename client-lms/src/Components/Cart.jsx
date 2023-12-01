import React, { useState } from 'react'
import { removeCartItem } from '../Redux/Slices/cartSlice';
import { useDispatch } from 'react-redux';

const Cart = ({data}) => {
  const dispatch = useDispatch()
  const _id = data?._id
  const [removeCartDetails, setRemoveCartDetails] = useState({
    bookId : _id
    });

  const hndleRemoveCartItem = async(e) => { 
    e.preventDefault();
    try {
      const response= await dispatch(removeCartItem(removeCartDetails))
      if (response?.success) {
        setRemoveCartDetails({
          bookId : _id
        })
        toast.success('Item removed successfully')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <div className='flex flex-col md:flex-row items-center justify-between border-b py-5 w-[90%] md:w-[94%]'>
        <div className='md:w-[33%] w-[80%] justify-center flex '>
            <img className=' w-40' src={data?.thumbnail?.secure_url} alt="bookCover" />
        </div>
        <div className='flex flex-col gap-1 w-[59%] md:my-0 my-5 md:self-start'>
            
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
        <div onClick={hndleRemoveCartItem}  className=' cursor-pointer w-[8%] md:self-start flex justify-end'>
           Remove
        </div>
      </div>
    </>
  )
}

export default Cart
