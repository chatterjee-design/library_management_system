import React from "react";
import {  useSelector } from "react-redux";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const AreaCharts = () => {
  const { ordersByMonth } = useSelector((state) => state.stat);

  //data for the chart from the statslice 
  const data = ordersByMonth.map(({ day, month, year, count }) => {
    const date = new Date(year, month - 1, day);
    const formattedDate = `${day} ${date.toLocaleString("en-us", {
      month: "short",
    })}`;
    return {
      name: formattedDate,
      orders: count,
    };
  });

  return (
    <div className="my-10 md:my-0 flex flex-col w-screen md:w-[650px] h-[250px] justify-evenly items-center ">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <h1 className="font-mono tracking-widest">Daily Total Orders</h1>
    </div>
  );
};

export default AreaCharts;
