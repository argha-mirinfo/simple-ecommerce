import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductWithQuantity } from "../interfaces";

export interface CartState {
    cartArray: ProductWithQuantity[]
}

const initialState: CartState = {
    cartArray: [],
}

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        setCartArray: (state, action: PayloadAction<{ product: ProductWithQuantity }>) => {
            const { product } = action.payload;
            const existingProduct = state.cartArray.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.cartArray.push({ ...product, quantity: 1 });
            }
        },
    }
})

export const { setCartArray } = cartSlice.actions

export default cartSlice.reducer