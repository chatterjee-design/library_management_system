import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/AxiosInstance";

const initialState ={
    cartItem: JSON.parse(localStorage.getItem("cartItem")) || [],
}

const addCartItem = createAsyncThunk ('/cart/add', async (_id) =>{
    try {
        const response = await axiosInstance('/cart/', {
            method: "POST",
            data: _id
          });
        return response.data
    } catch (error) {
        toast.error(error.message);
    }
})

const getCartItem = createAsyncThunk ('/cart/get', async () => {
    try {
        const response = await axiosInstance('/cart/', {
            method: "GET",
          });
        return response.data
    } catch (error) {
        toast.error(error.message);
    }
})
const removeCartItem = createAsyncThunk ('/cart/get', async (_id) => {
    try {
        const response = await axiosInstance('/cart/', {
            method: "DELETE",
            data : _id
          });
        return response.data
    } catch (error) {
        toast.error(error.message);
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
      .addCase(getCartItem.fulfilled, (state, action) => {
        if (action.payload) {
          state.cartItem = [...action.payload?.data?.items];
        }
      })
    }
})

export default cartSlice.reducer;
export {
    addCartItem,
    getCartItem,
    removeCartItem
}