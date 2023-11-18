import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import librarySlice from "./Slices/library.slice";


const store = configureStore({
    reducer : {
        auth : authSlice,
        library : librarySlice
    }
})

export default store