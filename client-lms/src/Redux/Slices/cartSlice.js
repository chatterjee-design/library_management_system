import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/AxiosInstance";

const initialState ={
    cartItem: JSON.parse(localStorage.getItem("cartItem")) || [],
}

const addCartItem = createAsyncThunk ('/cart/add', async () =>{
    try {
        const response = await axiosInstance('/cart/', {
            method: "POST",
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

    }
})

export default cartSlice.reducer;
export {addCartItem}