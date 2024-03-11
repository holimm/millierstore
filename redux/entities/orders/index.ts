import { notificationMessage } from "@/helpers/commonHelpers";
import { CheckoutInformationType } from "@/models/orderModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  cancelOrderById,
  createOrder,
  fetchOrderByCode,
  fetchOrdersByAccountId,
} from "./asyncThunk";
import { ResponseBEType } from "@/models/common";

const storeName = "checkoutSlice";

export const orderSlice = createSlice({
  name: storeName,
  initialState: {
    idsOrders: [],
    idsOrderByCode: {},
    loadingOrders: false,
    loadingOrderByCode: "pending",
    loadingCreateOrder: false,
    loadingCancelOrder: false,
  },
  reducers: {
    saveOrders(state, action: PayloadAction<CheckoutInformationType[]>) {
      state.idsOrders = action.payload;
    },
    saveOrderByCode(state, action: PayloadAction<CheckoutInformationType>) {
      state.idsOrderByCode = action.payload;
    },
    setLoadingOrders(state, action: PayloadAction<boolean>) {
      state.loadingOrders = action.payload;
    },
    setLoadingOrdersByCode(state, action: PayloadAction<string>) {
      state.loadingOrderByCode = action.payload;
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
        type: `${storeName}/setLoadingOrders`,
      });
    });
    builder.addCase(fetchOrdersByAccountId.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<CheckoutInformationType[]>;
      orderSlice.caseReducers.saveOrders(state, {
        payload: data,
        type: `${storeName}/saveOrders`,
      });
      orderSlice.caseReducers.setLoadingOrders(state, {
        payload: false,
        type: `${storeName}/setLoadingOrders`,
      });
    });
    //GET ORDER BY CODE
    builder.addCase(fetchOrderByCode.pending, (state, { payload }) => {
      orderSlice.caseReducers.setLoadingOrdersByCode(state, {
        payload: "pending",
        type: `${storeName}/setLoadingOrdersByCode`,
      });
    });
    builder.addCase(fetchOrderByCode.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<CheckoutInformationType>;
      orderSlice.caseReducers.saveOrderByCode(state, {
        payload: data,
        type: `${storeName}/saveOrderByCode`,
      });
      orderSlice.caseReducers.setLoadingOrdersByCode(state, {
        payload: "success",
        type: `${storeName}/setLoadingOrdersByCode`,
      });
    });
    builder.addCase(fetchOrderByCode.rejected, (state, { error }) => {
      orderSlice.caseReducers.setLoadingOrdersByCode(state, {
        payload: "error",
        type: `${storeName}/setLoadingOrdersByCode`,
      });
      notificationMessage({ type: "error", content: error.message });
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
      window.dispatchEvent(new Event("open_order_success_modal"));
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

export const {
  saveOrders,
  saveOrderByCode,
  setLoadingOrders,
  setLoadingOrdersByCode,
  setLoadingCreateOrder,
  setLoadingCancelOrder,
} = orderSlice.actions;
export default orderSlice.reducer;

export const getOrdersData = (state: any): CheckoutInformationType[] =>
  state[storeName].idsOrders;
export const getOrdersLoadingData = (state: boolean) =>
  state[storeName].loadingOrders;
export const getOrderByCodeData = (state: any): CheckoutInformationType[] =>
  state[storeName].idsOrderByCode;
export const getOrderByCodeLoadingData = (state: string) =>
  state[storeName].loadingOrderByCode;
export const getCreateOrderLoadingData = (state: boolean) =>
  state[storeName].loadingCreateOrder;
export const getCancelOrderLoadingData = (state: boolean) =>
  state[storeName].loadingCancelOrder;
