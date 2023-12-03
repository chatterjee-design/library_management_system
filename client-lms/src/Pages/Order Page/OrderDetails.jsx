import React, { useEffect } from 'react'
import LayoutOther from '../../Layout/LayoutOther'
import { Link, useParams } from 'react-router-dom'
import { getAllOrders, getOneOrder } from '../../Redux/Slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import OrderCard from '../../Components/order/OrderCard';

const OrderDetails = () => {
    const {_id }= useParams()
    const dispatch = useDispatch()
    const { oneItem } = useSelector((state) => state.order)
    const hndleOrderDetails = async () => {
    await dispatch(getOneOrder(_id));
  };

  useEffect(()=>{
    hndleOrderDetails()
  },[])
  const books = oneItem.map((item) => item?.bookId);
  return (
    <LayoutOther>
      <div className="flex items-center justify-center">
        <ul className="steps">
        <Link to='/cart'  className="step step-neutral">Books Added</Link>
          <Link to='/order/checkout' className="step step-neutral">Checkout</Link>
          <Link to='/my-orders' className="step step-neutral ">Borrow</Link>
          <li className="step ">Return</li>
        </ul>
      </div>
      <div className=" min-h-fit my-10 w-[100%] flex  flex-col justify-center items-center">
      {books &&
            books.map((book) => {
              return <OrderCard {...book} key={book._id} data={book} />;
            })}
      <div className=" self-end mr-8 text-lg font-sans tracking-widest">
            <h3>Total({oneItem.length} items) : $55</h3>
          </div>
      </div>
    </LayoutOther>
  )
}

export default OrderDetails
