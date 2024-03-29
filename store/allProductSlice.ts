import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductWithQuantity } from "../interfaces";

export interface AllProductState {
    allProductArray: ProductWithQuantity[]
}

const initialState: AllProductState = {
    allProductArray: [],
}

const allProductSlice = createSlice({
    name: "allProductSlice",
    initialState,
    reducers: {
        setAllProductArray: (state, action) => {
            state.allProductArray = action.payload
        },
        updateProductQuantity: (state, action: PayloadAction<{ productId: number, type: string }>) => {
            const { productId, type } = action.payload;
            state.allProductArray = state.allProductArray.map((product) => {
                if (productId === product.id) {
                    return {
                        ...product,
                        quantity: type == "increase" ? product.quantity + 1 : product.quantity - 1,
                    };
                }
                return product;
            });
        },
    }
})

export const { setAllProductArray, updateProductQuantity } = allProductSlice.actions

export default allProductSlice.reducer