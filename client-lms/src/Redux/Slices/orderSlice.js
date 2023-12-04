import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/AxiosInstance";


const initialState = {
    orderItems:  [],
    orderItemsPerCart: [],
    _id: '',
    oneItem: []
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

const getOneOrder = createAsyncThunk ('/order/getOneOrder', async (_id) =>{
    try {
        const response = await axiosInstance(`/order/${_id}`, {
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
            if (action.payload && action.payload.data) {
                state.orderItems = [...action?.payload?.data];
              }
          })
        .addCase(placeOrder.fulfilled, (state, action) => {
            if (action.payload) {
                state._id = action?.payload?.data?._id;
            }
          })
        .addCase(getOneOrder.fulfilled, (state, action) => {
            if (action.payload) {
                console.log(action.payload)
                state.oneItem= [...action?.payload?.data?.items];
            }
          })
    }
})

export default orderSlice.reducer;

export {placeOrder, getAllOrders, getOneOrder}