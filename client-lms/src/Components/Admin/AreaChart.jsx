import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Area,

  } from "recharts";


const AreaCharts = () => {
    const { ordersByMonth } = useSelector((state) => state.stat);

    const data = ordersByMonth.map(({ day, month, year, count }) => {
      const date = new Date(year, month - 1, day);
      const formattedDate = `${day} ${date.toLocaleString("en-us", {
        month: "short",
      })}`;
      return {
        name: formattedDate,
        value: count,
      };
    });

  return (
    <div  className='min-h-[58vh] flex justify-evenly items-center'>
      <AreaChart
          width={650}
          height={250}
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
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
    </div>
  )
}

export default AreaCharts
