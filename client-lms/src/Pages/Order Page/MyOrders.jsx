import React, { useEffect } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import { useDispatch, useSelector } from "react-redux";
import MyOrdersCard from "../../Components/order/MyOrder/myOrdersCard";
import LoaderPage2 from "../Loader/Loader2";
import { getAllOrders } from "../../Redux/Slices/orderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orderItems, loading } = useSelector((state) => state.order);
  const hndleOrderDetails = async () => {
      await dispatch(getAllOrders());
  };

  // console.log(orderItems);
  useEffect(() => {
    hndleOrderDetails();
  }, [dispatch]);

  return (
    <LayoutOther>
      {loading ? (
        <LoaderPage2 />
      ) : (
        <div className="flex flex-col min-h-[78.3vh] items-center justify-center w-screen p-10">
          {orderItems &&
            orderItems.length > 0 &&
            orderItems.map((book) => (
              <MyOrdersCard {...book} key={book._id} data={book} />
            ))}
        </div>
      )}
    </LayoutOther>
  );
};

export default MyOrders;
