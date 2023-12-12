import React, { useEffect, useState } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import AreaCharts from "../../Components/Admin/AreaChart";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../Redux/Slices/statSlice";
import TotalCounts from "../../Components/Admin/TotalCounts";
import PieCharts from "../../Components/Admin/PieChart";
import LoaderPage2 from "../Loader/Loader2";

const AdminDashboard = () => {
  const { loading } = useSelector((state) => state.stat);
  const dispatch = useDispatch();
  const hndleStats = async () => {
    await dispatch(getStats());
  };

  useEffect(() => {
    hndleStats();
  }, [dispatch]);
  return (
    <LayoutOther>
      {loading ? (
        <LoaderPage2 />
      ) : (
        <div>
          <TotalCounts />
          <div className="flex min-h-[58vh] flex-col md:flex-row  justify-center items-center w-[100vw]">
            <div className=" w-screen md:w-fit">
              <AreaCharts />
            </div>
            <div className="w-screen  md:w-fit">
              <PieCharts />
            </div>
          </div>
        </div>
      )}
    </LayoutOther>
  );
};

export default AdminDashboard;
