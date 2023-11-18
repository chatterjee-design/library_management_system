import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState ={
    libraryData : []
}

const librarySlice = createSlice ({
    name : 'library',
    initialState,
    reducers :{}
})

export default librarySlice.reducer