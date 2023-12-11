import { fill } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Cell, Pie, PieChart } from "recharts";

const PieCharts = () => {
  const { totalOrders, totalUsers, adminUsers, totalBooks, totalReturns } =
    useSelector((state) => state.stat);

  const data = [
    {
      name: "Total Orders",
      value: totalOrders,
      fill: "#5c268d",
    },
    {
      name: "Total Returns",
      value: totalReturns,
      fill: "#5c269d",
    },
  ];
  return (
    <div >
      <PieChart width={500} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          background
          label
        />
        
      </PieChart>
    </div>
  );
};

export default PieCharts;
