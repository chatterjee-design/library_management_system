import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import librarySlice from "./Slices/library.slice";
import cartSlice from "./Slices/cartSlice";
import orderSlice from "./Slices/orderSlice";
import statSlice from "./Slices/statSlice";
import contactSlice from "./Slices/contactSlice";


const store = configureStore({
    reducer : {
        auth : authSlice,
        library : librarySlice,
        cart : cartSlice,
        order : orderSlice,
        stat : statSlice,
        contact: contactSlice
    }
})

export default store