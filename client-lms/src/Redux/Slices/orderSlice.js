import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/AxiosInstance";

const initialState = {
  orderItems: [],
  orderItemsPerCart: [],
  _id: "",
  isReturned: false,
  oneItem: [],
  isRetuneDateExceeded: false,
  orderDate: '',
  loading: false,
};

const placeOrder = createAsyncThunk("/order/add", async () => {
  try {
    const response = await axiosInstance("/order/", {
      method: "POST",
    });

    return response.data;
  } catch (error) {
    toast.error(error?.data?.message);
  }
});

const getAllOrders = createAsyncThunk("/order/getAllorder", async () => {
  try {
    const response = await axiosInstance("/order/", {
      method: "GET",
    });
    return response.data;
  } catch (error) {
    toast.error(error?.data?.message);
  }
});

const getOneOrder = createAsyncThunk("/order/getOneOrder", async (_id) => {
  try {
    const response = await axiosInstance(`/order/${_id}`, {
      method: "GET",
    });
    return response.data;
  } catch (error) {
    toast.error(error?.data?.message);
  }
});

const returnOrder = createAsyncThunk("/order/return", async (_id) => {
  try {
    const response = await axiosInstance(`/order/${_id}`, {
      method: "PUT",
    });
    return response.data;
  } catch (error) {
    toast.error(error?.data?.message);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.orderItems = [...action?.payload?.data];
          state.loading = false;
        }
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        if (action.payload) {
          state._id = action?.payload?.data?._id;
          state.loading = false;
        }
      })
      .addCase(getOneOrder.fulfilled, (state, action) => {
        if (action.payload) {
          state.oneItem = [...action?.payload?.data?.items];
          state.orderDate = action?.payload?.data?.orderDate
          state.isRetuneDateExceeded = action.payload?.isReturnDeadlineExceeded
          state.isReturned = action.payload?.data?.returned;
          state.loading = false;
        }
      })
      .addCase(returnOrder.fulfilled, (state, action) => {
        if (action.payload) {
            state.loading = false;
        }
      })
      

      // if function is pending
      .addCase(placeOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOneOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllOrders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(returnOrder.pending, (state, action) => {
        state.loading = true;
      })
  },
});

export default orderSlice.reducer;

export { placeOrder, getAllOrders, getOneOrder, returnOrder };
