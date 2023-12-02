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
          console.log(response)
        return response.data
    } catch (error) {
        toast.error(error?.data?.message);
    }
})

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
})

export default orderSlice.reducer;

export {placeOrder}