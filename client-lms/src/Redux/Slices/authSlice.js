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
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return  response.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const logInAccount = createAsyncThunk("/auth/logIn", async (data) => {
    try {

        const response = await axiosInstance.post('/user/login', data)
        toast.promise(
            Promise.resolve(response),
            {
            loading: "Please Wait!",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed the Login process..."
        });
        return  response.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const logOutAccount = createAsyncThunk("/auth/logOut", async () => {
    try {
        const response = await axiosInstance ('/user/logout')
    toast.promise (
        Promise.resolve(response),
        {
            loading : "Please Wait! logging out...",
            success : "Logged out successfully",
            error : "Something Went Wrong"
        }
    )
    return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers : (builder) =>{
        builder
        .addCase(logInAccount.fulfilled, (state, action) => {
            localStorage.setItem('data', JSON.stringify(action?.payload?.user))
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('role', (action?.payload?.user?.role))
            state.isLoggedIn = true
            state.data = action?.payload?.user
            state.role = action?.payload?.user?.role
        })
        .addCase(createAccount.fulfilled, (state, action) => {
            localStorage.setItem('data', JSON.stringify(action?.payload?.user))
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('role', (action?.payload?.user?.role))
            state.isLoggedIn = true
            state.data = action?.payload?.user
            state.role = action?.payload?.user?.role
        })
        .addCase(logOutAccount.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
    }
})

export default authSlice.reducer
export {
    createAccount,
    logInAccount,
    logOutAccount
}