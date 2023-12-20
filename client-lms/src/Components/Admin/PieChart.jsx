import { fill } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Cell, Label, LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";

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
    <div className=" flex mb-10 md:mb-0 md:w-[500px] h-[250px] w-screen flex-col items-center justify-center">
      <ResponsiveContainer>
      <PieChart >
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
      </ResponsiveContainer>
      <h1 className='font-mono tracking-widest'>Total Orders & Returns</h1>
    </div>
  );
};

export default PieCharts;
