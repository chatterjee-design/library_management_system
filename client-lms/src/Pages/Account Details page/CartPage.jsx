import React from "react";
import LayoutOther from "../../Layout/LayoutOther";
import { useSelector } from "react-redux";
import Cart from "../../Components/Cart";
import { FaRegCircleCheck } from "react-icons/fa6";

const CartPage = () => {
  const { cartItem } = useSelector((state) => state.library);

  return (
    <LayoutOther>
      <div className=" min-h-[78.7vh] w-[100%] flex justify-evenly items-center">
        <div className=" shadow-sd2 md:w-[72%] items-center flex justify-center flex-col my-5 py-5">
          <div className=" self-end mr-8 text-lg font-sans tracking-widest">
            <p>Price</p>
          </div>

          {cartItem &&
            cartItem.map((book) => {
              return <Cart {...book} key={book._id} data={book} />;
            })}

          <div className=" self-end mr-8 text-lg font-sans tracking-widest">
            <h3>Subtotal({cartItem.length} items) : $55</h3>
          </div>
        </div>
        <div className="shadow-sd2 md:w-[22%] py-5 items-center flex justify-center flex-col self-start mt-5">
          <div className="flex items-start justify-center text-justify text-green-600">
            <FaRegCircleCheck className=" m-2"/>
            <p className="text-md font-sans ">
              You have to return the book <br />
              in 7 days Unless it will cost<br />
              Late fine.
            </p>
          </div>
          <div>
            <h2 className="text-xl pt-4 font-serif tracking-wider">Subtotal ({cartItem.length} items): $55</h2>
          </div>

          <button className="mt-5 btn bg-[#5c269d] text-white tracking-[0.3em] btn-primary  ">Borrow</button>
        </div>
      </div>
    </LayoutOther>
  );
};

export default CartPage;
