import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/AxiosInstance";

const initialState ={
    cartItem: JSON.parse(localStorage.getItem("cartItem")) || [],
    loading: false,
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
const removeCartItem = createAsyncThunk ('/cart/remove', async ({bookId}) => {
    try {
        const response = await axiosInstance('/cart/', {
            method: "DELETE",
            data : {bookId}
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
        // if status is fulfilled
      .addCase(getCartItem.fulfilled, (state, action) => {
        if (action.payload) {
          state.cartItem = [...action.payload?.data?.items];
        }
        state.loading = false;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        if (action.payload) {
            state.cartItem = [...action.payload?.data?.items]; 
        }
        state.loading = false;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false;
      })

      //is status is pending
      .addCase(removeCartItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCartItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCartItem.pending, (state, action) => {
        state.loading = true;
      })
      
    }
})

export default cartSlice.reducer;
export {
    addCartItem,
    getCartItem,
    removeCartItem
}