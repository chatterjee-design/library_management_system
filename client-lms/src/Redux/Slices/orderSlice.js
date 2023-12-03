import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/AxiosInstance";


const initialState = {
    orderItem:  [],
}

 const placeOrder= createAsyncThunk ('/order/add', async () =>{
    try {
        const response = await axiosInstance('/order/', {
            method: "POST",
          });
          
        return response.data
    } catch (error) {
        toast.error(error?.data?.message);
    }
})

const getAllOrders = createAsyncThunk ('/order/getAllorder', async () =>{
try {
    const response = await axiosInstance('/order/', {
        method: "GET"
    })
    return response.data

} catch (error) {
    toast.error(error?.data?.message);
}
})

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllOrders.fulfilled, (state, action) => {
            if (action.payload) {
              state.orderItem= [...action?.payload?.data];
            }
          })
    }
})

export default orderSlice.reducer;

export {placeOrder, getAllOrders}