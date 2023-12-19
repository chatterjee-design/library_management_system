import React, { useEffect, useState } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import { Link, useParams } from "react-router-dom";
import { getOneOrder, returnOrder } from "../../Redux/Slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../../Components/order/OrderCard";
import toast from "react-hot-toast";
import LoaderPage2 from "../Loader/Loader2";
import { FaRegCircleCheck } from "react-icons/fa6";

const OrderDetails = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { oneItem, isReturned, loading, orderDate, isRetuneDateExceeded } =
    useSelector((state) => state.order);

  const hndleOrderDetails = async () => {
    await dispatch(getOneOrder(_id));
  };

  const hndleRetunOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(returnOrder(_id));
      if (res?.payload?.success) {
        toast.success("Book is successfully returned");
        await dispatch(getOneOrder(_id));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    hndleOrderDetails();
  }, [_id]);

  const books = oneItem.map((item) => item?.bookId);

  // Function to format date as "1-12-2023"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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

          {isRetuneDateExceeded ? (
            <li className="step step-error ">Return</li>
          ) : isReturned ? (
            <li className="step step-neutral ">Return</li>
          ) : (
            <li className="step ">Return</li>
          )}
        </ul>
      </div>
      {loading ? (
        <LoaderPage2 />
      ) : (
        <div className=" min-h-fit mt-5 mb-3 w-[100%] flex  flex-col justify-center items-center">
          {books &&
            books.map((book) => {
              return <OrderCard {...book} key={book._id} data={book} />;
            })}
          <div className=" self-end mr-8 text-lg font-sans tracking-widest">
            <h3>Date of order : {formatDate(orderDate)}</h3>
            <h3>Total : ({oneItem.length} item) </h3>

            {isReturned === true ? (
              <button className="btn btn-disabled bg-[#5c269d] my-2 text-white tracking-[0.3em] btn-primary">
                Returned
              </button>
            ) : (
              <Link
                onClick={hndleRetunOrder}
                className="btn my-2 bg-[#5c269d] text-white tracking-[0.3em] btn-primary"
              >
                Return
              </Link>
            )}
            {isRetuneDateExceeded ? (
              <div className="flex text-xs items-start justify-center text-justify text-red-600">
                <p className=" font-sans ">
                  You didn't return the book 
                  in 7 days.
                </p>
              </div>
            ) : ''}
          </div>
        </div>
      )}
    </LayoutOther>
  );
};

export default OrderDetails;
