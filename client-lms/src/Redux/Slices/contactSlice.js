import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/AxiosInstance";

const initialState = {
    loading: false,
};

const fillContactForm = createAsyncThunk(
    "/contact",
    async (data) => {
      try {
        const response = await axiosInstance("/contact/", {
          method: "POST",
          data: data,
        });
        return response.data;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  );


const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fillContactForm.fulfilled, (state, action) => {
        if(action.payload){
            state.loading = false;
        }
    })
    .addCase(fillContactForm.pending, (state, action) => {
        state.loading = true;
    })
  }
});

export default contactSlice.reducer;
export {fillContactForm}