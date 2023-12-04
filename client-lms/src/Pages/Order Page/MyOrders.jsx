import React, { useEffect } from 'react'
import LayoutOther from '../../Layout/LayoutOther'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../Redux/Slices/orderSlice'
import MyOrdersCard from '../../Components/order/MyOrder/myOrdersCard'


const MyOrders = () => {
    const dispatch = useDispatch()
    const {  orderItems } = useSelector((state) => state.order)
    const hndleOrderDetails = async () => {
    await dispatch(getAllOrders());
  };
  const book = orderItems.map((item) => item);
  
  
  useEffect(()=>{
    hndleOrderDetails()
  },[])
  
  console.log(book)
  // console.log(orderItemsPerCart)
  return (
    <LayoutOther>
      
      <div className='flex flex-col items-center justify-center w-screen p-10 '>
      {book &&
            book.map((book) => {
              return <MyOrdersCard {...book} key={book._id} data={book} />;
            })}
      </div>
    </LayoutOther>
  )
}

export default MyOrders
