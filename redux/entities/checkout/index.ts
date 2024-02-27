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

const storeName = "checkoutSlice";

export const checkoutSlice = createSlice({
  name: storeName,
  initialState: {
    checkoutInfo: {},
  },
  reducers: {
    saveCheckoutInformation(
      state,
      action: PayloadAction<CheckoutInformationType>
    ) {
      state.checkoutInfo = Object.assign(state.checkoutInfo, action.payload);
    },
  },
});

export const { saveCheckoutInformation } = checkoutSlice.actions;
export default checkoutSlice.reducer;

export const getCheckoutInformationData = (state: CheckoutInformationType) =>
  state[storeName].checkoutInfo;
