import React, { useEffect, useState } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import { Link, useParams } from "react-router-dom";
import {
  getAllOrders,
  getOneOrder,
  returnOrder,
} from "../../Redux/Slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../../Components/order/OrderCard";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { oneItem, isReturned } = useSelector((state) => state.order);

  const hndleOrderDetails = async () => {
    await dispatch(getOneOrder(_id));
  };

  const hndleRetunOrder = async (e) => {
    e.preventDefault();
    try {
     const res =  await dispatch(returnOrder(_id));
     if (res?.payload?.success) {
        toast.success('Book is successfully returned')
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    hndleOrderDetails();
  }, [ hndleRetunOrder]);

  const books = oneItem.map((item) => item?.bookId);
  return (
    <LayoutOther>
      <div className="flex items-center justify-center">
        <ul className="steps">
          <Link to="/cart" className="step step-neutral">
            Books Added
          </Link>
          <Link to="/order/checkout" className="step step-neutral">
            Checkout
          </Link>
          <Link to="/my-orders" className="step step-neutral ">
            Borrow
          </Link>
          {isReturned === true ?<li className="step step-neutral ">Return</li>:<li className="step ">Return</li>}
        </ul>
      </div>
      <div className=" min-h-fit mt-5 mb-3 w-[100%] flex  flex-col justify-center items-center">
        {books &&
          books.map((book) => {
            return <OrderCard {...book} key={book._id} data={book} />;
          })}
        <div className=" self-end mr-8 text-lg font-sans tracking-widest">
          <h3>Total({oneItem.length} items) : $55</h3>
          {isReturned === true ? (
           <button className="btn btn-disabled bg-[#5c269d] my-2 text-white tracking-[0.3em] btn-primary"
           >
            Returned
           </button>
          ) : (
            <Link onClick={hndleRetunOrder} className="btn my-2 bg-[#5c269d] text-white tracking-[0.3em] btn-primary"
              >
               Return
              </Link>
          )}
        </div>
      </div>
    </LayoutOther>
  );
};

export default OrderDetails;
