import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import allProductReducer from "./allProductSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        allProduct: allProductReducer,
    }
})