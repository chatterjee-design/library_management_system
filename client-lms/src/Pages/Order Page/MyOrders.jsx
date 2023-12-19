import React, { useEffect } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../Redux/Slices/orderSlice";
import MyOrdersCard from "../../Components/order/MyOrder/myOrdersCard";
import LoaderPage2 from "../Loader/Loader2";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orderItems, loading } = useSelector((state) => state.order);
  const hndleOrderDetails = async () => {
    await dispatch(getAllOrders());
  };
  const book = orderItems.map((item) => item);

  useEffect(() => {
    hndleOrderDetails();
  }, [dispatch]);

  return (
    <LayoutOther>
      {loading ? (
        <LoaderPage2 />
      ) : (
        <div className="flex flex-col items-center justify-center w-screen p-10 ">
          {book &&
            book.map((book) => {
              return <MyOrdersCard {...book} key={book._id} data={book} />;
            })}
        </div>
      )}
    </LayoutOther>
  );
};

export default MyOrders;
