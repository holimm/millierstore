import { CartType } from "@/models/cartModel";
import {
  ProductColorType,
  ProductStorageType,
} from "@/models/productDetailModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const storeName = "cartSlice";

export const cartSlice = createSlice({
  name: storeName,
  initialState: {
    cart: [],
  },
  reducers: {
    saveCart(state, action: PayloadAction<CartType>) {
      state.cart.push(action.payload);
    },
  },
});

export const { saveCart } = cartSlice.actions;
export default cartSlice.reducer;

export const getCartList = (state: CartType[]) => state[storeName].cart;
