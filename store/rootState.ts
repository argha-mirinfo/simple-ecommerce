import { CartState } from "./cartSlice";
import { AllProductState } from "./allProductSlice";

export interface RootState {
    cart: CartState;
    allProduct: AllProductState;
}