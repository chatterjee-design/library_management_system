import React, { useEffect } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import { getAllOrders, placeOrder } from "../../Redux/Slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getCartItem } from "../../Redux/Slices/cartSlice";

const CheckOut = () => {
  const { cartItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const hndlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(placeOrder());

      if (response?.success) {
        toast.success("Order confirmed!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCartItemDetails = async () => {
    await dispatch(getCartItem());
  };
  useEffect(() => {
    getCartItemDetails();
  }, []);

  // const hndleOrderDetails = async (e) => {
  //   await dispatch(getAllOrders());
  // };


  // useEffect(()=>{
  //   hndleOrderDetails()
  // },[])

  return (
    <LayoutOther>
      <div className="flex items-center justify-center">
        <ul className="steps">
          <Link to='/cart'  className="step step-neutral">Books Added</Link>
          <li className="step step-neutral">Checkout</li>
          <li className="step">Borrow</li>
          <li className="step">Order Confirmed</li>
        </ul>
      </div>
      <div className=" min-h-[67.8vh] w-[100%] flex md:flex-row flex-col justify-center items-center">
      <div className="shadow-sd2 md:w-96 w-[85%] mb-10 py-10 items-center flex justify-center flex-col  mt-5">
          <div className="flex items-start justify-center text-justify text-green-600">
            <FaRegCircleCheck className=" m-2" />
            <p className="text-md font-sans ">
              You have to return the book in 7 days<br />
               Unless it will cost Late fine.
            </p>
          </div>
          <div>
            <h2 className="text-xl pt-4 font-serif tracking-wider">
              Subtotal {cartItem.length} books
            </h2>
          </div>
          <Link
            to="/order/checkout"
            onClick={hndlePlaceOrder}
            className="mt-5 btn bg-[#5c269d] text-white tracking-[0.3em] btn-primary  "
          >
            Borrow
          </Link>
        </div>
      </div>
    </LayoutOther>
  );
};

export default CheckOut;
