import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/AxiosInstance";


const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn')  || false,
    role : localStorage.getItem('role') || '',
    data: localStorage.getItem('data') || {},
    loading : false
};

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
        return  response.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const logOutAccount = createAsyncThunk("/auth/logOut", async () => {
    try {
        const response = await axiosInstance ('/user/logout')
    return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const getProfile = createAsyncThunk("/auth/getProfile", async () =>{
    try {
        const response = await axiosInstance ('/user/user')
        return  response.data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const changePassword = createAsyncThunk(
    "auth/changePassword",
    async ({ data, _id }) => {
  try {
    const response = await axiosInstance(`user/change-password/${_id}`, {
        method: "POST",
        data: data,
      });
    return response.data
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
})

const forgotPassword = createAsyncThunk('auth/forgot-password', async (data) => {
    try {
        const response = await axiosInstance.post('/user/forgot-password', data)
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({ data, resetToken }) => {
  try {
    const response = await axiosInstance(`user/reset-password/${resetToken}`, {
        method: "POST",
        data: data,
      });
    return response.data
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
})

const editProfile = createAsyncThunk(
    "auth/editProfile",
    async ({ data, _id }) => {
  try {
    const response = await axiosInstance(`user/update/${_id}`, {
        method: "PUT",
        data: data,
      });
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
    //fulfilled promise
        builder
        .addCase(logInAccount.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem('data', JSON.stringify(action?.payload?.user))
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('role', (action?.payload?.user?.role))
            state.isLoggedIn = true
            state.data = action?.payload?.user
            state.role = action?.payload?.user?.role
        })
        .addCase(createAccount.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem('data', JSON.stringify(action?.payload?.user))
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('role', (action?.payload?.user?.role))
            state.isLoggedIn = true
            state.data = action?.payload?.user
            state.role = action?.payload?.user?.role
        })
        .addCase(logOutAccount.fulfilled, (state) => {
            state.loading = false
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            if(action?.payload){
                state.isLoggedIn = true
                state.loading = false;
                state.data = action?.payload?.data;
                state.role = action?.payload?.data?.role
                localStorage.setItem('data', JSON.stringify(state?.data))
            }
          })
        .addCase(editProfile.fulfilled, (state, action) => {
           state.loading = false
          })
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(changePassword.fulfilled, (state, action) => {
            state.loading = false;
        })
        
        //if actions are pending
        .addCase(createAccount.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getProfile.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getProfile.rejected, (state, action) => {
            state.loading = false;
        })
        .addCase(logInAccount.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(logOutAccount.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(editProfile.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(resetPassword.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(forgotPassword.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(changePassword.pending, (state, action) => {
            state.loading = true;
        })
    }
})

export default authSlice.reducer
export {
    createAccount,
    logInAccount,
    logOutAccount,
    getProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    editProfile
}