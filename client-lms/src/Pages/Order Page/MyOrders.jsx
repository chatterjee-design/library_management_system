import React, { useEffect } from 'react'
import LayoutOther from '../../Layout/LayoutOther'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../Redux/Slices/orderSlice'

const MyOrders = () => {
    const dispatch = useDispatch()
    const { orderItem } = useSelector((state) => state.order)
    const hndleOrderDetails = async () => {
    await dispatch(getAllOrders());
  };

  
  useEffect(()=>{
    hndleOrderDetails()
  },[])
  
  console.log(orderItem)
  return (
    <LayoutOther>
     
    </LayoutOther>
  )
}

export default MyOrders
