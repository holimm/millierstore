import { notificationMessage } from "@/helpers/commonHelpers";
import { CheckoutInformationType } from "@/models/orderModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  cancelOrderById,
  createOrder,
  fetchOrdersByAccountId,
} from "./asyncThunk";
import { ResponseBEType } from "@/models/common";

const storeName = "checkoutSlice";

export const orderSlice = createSlice({
  name: storeName,
  initialState: {
    idsOrders: [],
    loadingOrders: false,
    loadingCreateOrder: false,
    loadingCancelOrder: false,
  },
  reducers: {
    saveOrders(state, action: PayloadAction<CheckoutInformationType[]>) {
      state.idsOrders = action.payload;
    },
    setLoadingOrders(state, action: PayloadAction<boolean>) {
      state.loadingOrders = action.payload;
    },
    setLoadingCreateOrder(state, action: PayloadAction<boolean>) {
      state.loadingCreateOrder = action.payload;
    },
    setLoadingCancelOrder(state, action: PayloadAction<boolean>) {
      state.loadingCancelOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    //GET ORDERS BY ACCOUNT ID
    builder.addCase(fetchOrdersByAccountId.pending, (state, { payload }) => {
      orderSlice.caseReducers.setLoadingOrders(state, {
        payload: true,
        type: `${storeName}/setLoadingCreateOrder`,
      });
    });
    builder.addCase(fetchOrdersByAccountId.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<CheckoutInformationType[]>;
      orderSlice.caseReducers.saveOrders(state, {
        payload: data,
        type: `${storeName}/saveGetOrders`,
      });
      orderSlice.caseReducers.setLoadingOrders(state, {
        payload: false,
        type: `${storeName}/setLoadingCreateOrder`,
      });
    });
    //LOADING CREATE ORDERS
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
      notificationMessage({
        type: "success",
        content: "Your order was created successfully!",
      });
      window.localStorage.removeItem("cart_session");
      window.dispatchEvent(new Event("storage"));
    });
    builder.addCase(createOrder.rejected, (state, { error }) => {
      orderSlice.caseReducers.setLoadingCreateOrder(state, {
        payload: false,
        type: `${storeName}/setLoadingCreateOrder`,
      });
      notificationMessage({ type: "error", content: error.message });
    });
    //CANCEL ORDER BY ID
    builder.addCase(cancelOrderById.pending, (state, { payload }) => {
      orderSlice.caseReducers.setLoadingCancelOrder(state, {
        payload: true,
        type: `${storeName}/setLoadingCancelOrder`,
      });
    });
    builder.addCase(cancelOrderById.fulfilled, (state, { payload }) => {
      orderSlice.caseReducers.setLoadingCancelOrder(state, {
        payload: false,
        type: `${storeName}/setLoadingCancelOrder`,
      });
      notificationMessage({
        type: "success",
        content: "Your order was cancelled!",
      });
      window.dispatchEvent(new Event("cancel_order"));
    });
  },
});

export const { saveOrders, setLoadingOrders, setLoadingCreateOrder } =
  orderSlice.actions;
export default orderSlice.reducer;

export const getOrdersData = (state: any): CheckoutInformationType[] =>
  state[storeName].idsOrders;
export const getOrdersLoadingData = (state: boolean) =>
  state[storeName].loadingOrders;
export const getCreateOrderLoadingData = (state: boolean) =>
  state[storeName].loadingCreateOrder;
export const getCancelOrderLoadingData = (state: boolean) =>
  state[storeName].loadingCancelOrder;
