import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/AxiosInstance";

const initialState ={
    libraryData : []
}

const getAllBooks = createAsyncThunk ("/library/books", async() => {
   try {
    
    const response = await axiosInstance ('/library/')
    toast.promise (
        Promise.resolve(response),
        {
            loading : "Please Wait! fetching all the books",
            success : "All the books are fetched",
            error : "Error while fetching the books"
        }
    )
    return response.data
   } catch (error) {
       toast.error(error?.response?.data?.message);
   }
})

const createBookDetails = createAsyncThunk ("//library/books/create", async(data) => {
try {
    
    const response = await axiosInstance ('/library/', {
        method: 'POST',
        data: data  
      });

    toast.promise(
        Promise.resolve(response),
        {
            loading : "Please Wait! Creating a new book details",
            success :  (data) => {
                return data?.data?.message;
            },
            error : "Error while fetching the books"
        }
    )
    console.log(response.data)
    return response.data

} catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error?.response?.data?.message)
}
})


const librarySlice = createSlice ({
    name : 'library',
    initialState,
    reducers :{},
    extraReducers: (builder) => {
        builder.addCase(getAllBooks.fulfilled, (state, action) => {
            if(action.payload) {
                state.libraryData = [...action.payload.books];
            }
        })
    }
})

export default librarySlice.reducer
export {
    getAllBooks,
    createBookDetails
}