import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/AxiosInstance";

const initialState = {
  totalUsers : 0,
  adminUsers : 0,
  totalBooks : 0,
  totalOrders : 0,
  totalReturns : 0,
  totalCartItems : 0,
  ordersByMonth : [],
  loading : false,
};

const getStats = createAsyncThunk("/stats/", async () => {
  try {
    const response = await axiosInstance.get("/stats/");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getStats.fulfilled, (state, action) => {
        if(action.payload){
            state.totalUsers = action?.payload?.totalUsers
            state.adminUsers = action?.payload?.adminUsers
            state.totalBooks = action?.payload?.totalBooks
            state.totalOrders = action?.payload?.totalOrders
            state.totalReturns = action?.payload?.totalReturns
            state.ordersByMonth = action?.payload?.ordersByMonth
            state.loading = false
        }
    })
    .addCase(getStats.pending, (state, action) => {
      state.loading = true
    })
  },
});

export default statSlice.reducer;
export { getStats };
