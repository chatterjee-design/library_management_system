import React, { useEffect } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../../Components/Cart";
import { FaRegCircleCheck } from "react-icons/fa6";
import { getCartItem } from "../../Redux/Slices/cartSlice";
import { placeOrder } from "../../Redux/Slices/orderSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cart);
  const books = cartItem.map((cartItem) => cartItem?.bookId);

  const getCartItemDetails = async () => {
    await dispatch(getCartItem());
  };
  useEffect(() => {
    getCartItemDetails();
  }, []);

  return (
    <LayoutOther>
      <div className="flex items-center justify-center">
        <ul className="steps">
          <Link to='/cart' className="step step-neutral">Books Added</Link>
          <Link to='/order/checkout' className="step ">Checkout</Link>
          <li className="step">Borrow</li>
          <li className="step">Order Confirmed</li>
        </ul>
      </div>
      <div className=" min-h-[67.8vh] w-[100%] flex md:flex-row flex-col justify-evenly items-center">
        <div className=" shadow-sd2 md:w-[72%] w-[90%] items-center flex justify-center flex-col my-5 py-5">
          {books &&
            books.map((book) => {
              return <Cart {...book} key={book._id} data={book} />;
            })}
          <div className=" self-end mr-8 text-lg font-sans tracking-widest">
            <h3>Subtotal({cartItem.length} items) : $55</h3>
          </div>
        </div>
        <div className="shadow-sd2 md:w-[22%] w-[85%] mb-10 py-5 items-center flex justify-center flex-col md:self-start mt-5">
          <div className="flex items-start justify-center text-justify text-green-600">
            <FaRegCircleCheck className=" m-2" />
            <p className="text-md font-sans ">
              You have to return the book <br />
              in 7 days Unless it will cost
              <br />
              Late fine.
            </p>
          </div>
          <div>
            <h2 className="text-xl pt-4 font-serif tracking-wider">
              Subtotal ({cartItem.length} items): $55
            </h2>
          </div>
          <Link
            to="/order/checkout"
            className="mt-5 btn bg-[#5c269d] text-white tracking-[0.3em] btn-primary  "
          >
            CheckOut
          </Link>
        </div>
      </div>
    </LayoutOther>
  );
};

export default CartPage;
