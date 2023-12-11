import React, { useEffect, useState } from "react";
import LayoutOther from "../../Layout/LayoutOther";
import AreaCharts from "../../Components/Admin/AreaChart";
import { useDispatch } from "react-redux";
import { getStats } from "../../Redux/Slices/statSlice";
import TotalCounts from "../../Components/Admin/TotalCounts";
import PieCharts from "../../Components/Admin/PieChart";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const hndleStats = async () => {
    await dispatch(getStats());
  };

  useEffect(() => {
    hndleStats();
  }, [dispatch]);
  return (
    <LayoutOther>
      <TotalCounts />
      <div className="flex min-h-[58vh] flex-col md:flex-row  justify-center items-center w-[100vw]">
        <div className=" w-screen md:w-fit">
          <AreaCharts />
        </div>
        <div className="w-screen md:w-fit">
          <PieCharts />
        </div>
      </div>
    </LayoutOther>
  );
};

export default AdminDashboard;
