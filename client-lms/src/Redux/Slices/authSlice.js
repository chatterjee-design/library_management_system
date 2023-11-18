import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/AxiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn')  || false,
    role : localStorage.getItem('role') || '',
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {}
}

const createAccount = createAsyncThunk("/auth/signUp", async (data) => {
    try {

        const response = await axiosInstance.post('/user/register', data)
        toast.promise(
            Promise.resolve(response),
            {
            loading: "Please Wait! creating your account",
            success: (data) => {
                console.log(data?.data?.message)
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return  response.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
})

export default authSlice.reducer
export {
    createAccount
}