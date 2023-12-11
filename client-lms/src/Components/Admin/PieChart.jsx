import { fill } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Cell, Label, LabelList, Pie, PieChart } from "recharts";

const PieCharts = () => {
  const { totalOrders, totalUsers, adminUsers, totalBooks, totalReturns } = useSelector((state) => state.stat);

  const data = [
    {
      name: "Total Orders",
      value: totalOrders,
      fill: "#5c268d",
    },
    {
      name: "Total Returns",
      value: totalReturns,
      fill: "#5b268dac",
    },
  ];
  return (
    <div className=" flex flex-col items-center justify-center">
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
        >
        </Pie>
        
      </PieChart>
      <h1 className='font-mono tracking-widest'>Total Orders & Returns</h1>
    </div>
  );
};

export default PieCharts;
