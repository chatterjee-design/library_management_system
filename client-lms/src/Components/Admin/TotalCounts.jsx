import React from "react";
import { useSelector } from "react-redux";
import { Cell, Label, LabelList, Pie, PieChart } from "recharts";

const TotalCounts = () => {
  const { totalOrders, totalUsers, adminUsers, totalBooks, totalReturns } = useSelector((state) => state.stat);

  return (
    <>
      <div className="min-h-[20.8vh] w-[100vw] font-mono tracking-wider flex justify-evenly items-center">
        <div className="stats text-[#5c269d] shadow bg-base-200">
          <div className="stat">
            <div className="stat-title">Total User count</div>
            <div className="stat-value text-center">{totalUsers}</div>
          </div>
        </div>
        
        <div className="stats text-[#5c269d] shadow bg-base-200">
          <div className="stat">
            <div className="stat-title">Total Admin User</div>
            <div className="stat-value text-center">{adminUsers}</div>
          </div>
        </div>
        <div className="stats text-[#5c269d] shadow bg-base-200">
          <div className="stat">
            <div className="stat-title">Total Books count</div>
            <div className="stat-value text-center">{totalBooks}</div>
          </div>
        </div>
        <div className="stats text-[#5c269d] shadow bg-base-200">
          <div className="stat">
            <div className="stat-title">Total Orders</div>
            <div className="stat-value text-center">{totalOrders}</div>
          </div>
        </div>
        <div className="stats text-[#5c269d] shadow bg-base-200">
          <div className="stat">
            <div className="stat-title">Total Returns</div>
            <div className="stat-value text-center">{totalReturns}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalCounts;
