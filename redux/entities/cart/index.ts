import { notificationMessage } from "@/helpers/commonHelpers";
import { CartType } from "@/models/cartModel";
import {
  ProductColorType,
  ProductStorageType,
} from "@/models/productDetailModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { isEmpty } from "lodash";

const storeName = "cartSlice";

export const cartSlice = createSlice({
  name: storeName,
  initialState: {
    cart: [],
  },
  reducers: {
    saveCart(state, action: PayloadAction<CartType>) {
      let exist = false;
      if (!isEmpty(state.cart)) {
        state.cart.map((item: CartType) => {
          if (
            item.name === action.payload.name &&
            item.color.lowercase === action.payload.color.lowercase &&
            item.storage.capacity === action.payload.storage.capacity &&
            item.storage.unit === action.payload.storage.unit
          )
            exist = true;
        });
      }
      if (exist) {
        notificationMessage({
          type: "error",
          content: "Product existed in cart",
        });
      } else {
        state.cart.push(action.payload);
        notificationMessage({
          type: "success",
          content: "Product added to cart",
        });
        window.localStorage.setItem("cart_session", JSON.stringify(state.cart));
        window.dispatchEvent(new Event("storage"));
      }
    },
    saveCartSession(state, action: PayloadAction<CartType[]>) {
      state.cart = action.payload;
    },
    removeFromCart(state, action: PayloadAction<CartType>) {
      state.cart = state.cart.filter((item: CartType) => {
        if (item.name !== action.payload.name) return true;
        if (item.color.lowercase !== action.payload.color.lowercase)
          return true;
        if (item.storage.capacity !== action.payload.storage.capacity)
          return true;
        if (item.storage.unit !== action.payload.storage.unit) return true;
        return false;
      });
      window.localStorage.setItem("cart_session", JSON.stringify(state.cart));
      window.dispatchEvent(new Event("storage"));
    },
    updateQuantity(state, action: PayloadAction<CartType>) {
      state.cart.map((item: CartType, index) => {
        if (
          item.name === action.payload.name &&
          item.color.lowercase === action.payload.color.lowercase &&
          item.storage.capacity === action.payload.storage.capacity &&
          item.storage.unit === action.payload.storage.unit
        ) {
          state.cart[index].quantity = action.payload.quantity;
          window.localStorage.setItem(
            "cart_session",
            JSON.stringify(state.cart)
          );
          window.dispatchEvent(new Event("storage"));
        }
      });
    },
  },
});

export const { saveCart, saveCartSession, removeFromCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;

export const getCartList = (state: CartType[]) => state[storeName].cart;
