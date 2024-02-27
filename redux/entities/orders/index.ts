import { notificationMessage } from "@/helpers/commonHelpers";
import { CartType } from "@/models/cartModel";
import { CheckoutInformationType } from "@/models/checkoutModel";
import {
  ProductColorType,
  ProductStorageType,
} from "@/models/productDetailModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { isEmpty } from "lodash";
import { createOrder } from "./asyncThunk";

const storeName = "checkoutSlice";

export const orderSlice = createSlice({
  name: storeName,
  initialState: {
    loadingCreateOrder: false,
  },
  reducers: {
    setLoadingCreateOrder(state, action: PayloadAction<boolean>) {
      state.loadingCreateOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state, { payload }) => {
      orderSlice.caseReducers.setLoadingCreateOrder(state, {
        payload: true,
        type: `${storeName}/setLoadingCreateOrder`,
      });
    });
    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      orderSlice.caseReducers.setLoadingCreateOrder(state, {
        payload: false,
        type: `${storeName}/setLoadingCreateOrder`,
      });
    });
  },
});

export const { setLoadingCreateOrder } = orderSlice.actions;
export default orderSlice.reducer;

export const getCreateOrderLoadingData = (state: boolean) =>
  state[storeName].loadingCreateOrder;
