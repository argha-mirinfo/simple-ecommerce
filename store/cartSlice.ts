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

            localStorage.setItem("cartArray", JSON.stringify(state.cartArray));
        },

        setCartArrayFromLocalStorage: (state, action: PayloadAction<{ products: ProductWithQuantity[] }>) => {
            const { products } = action.payload;
            state.cartArray = products
        },

        increaseProductQuantity: (state, action: PayloadAction<{ productId: number }>) => {
            const { productId } = action.payload;
            state.cartArray = state.cartArray.map((product) => {
                if (product.id === productId) {
                    return {
                        ...product,
                        quantity: product.quantity + 1,
                    };
                }
                return product;
            });

            localStorage.setItem("cartArray", JSON.stringify(state.cartArray));
        },

        decreaseProductQuantity: (state, action: PayloadAction<{ productId: number }>) => {
            const { productId } = action.payload;
            state.cartArray = state.cartArray
                .map((product) => {
                    if (product.id === productId) {
                        return {
                            ...product,
                            quantity: product.quantity - 1,
                        };
                    }
                    return product;
                })
                .filter((product) => product.quantity > 0);

            localStorage.setItem("cartArray", JSON.stringify(state.cartArray));
        },
    }
})

export const { setCartArray, increaseProductQuantity, decreaseProductQuantity, setCartArrayFromLocalStorage } = cartSlice.actions

export default cartSlice.reducer