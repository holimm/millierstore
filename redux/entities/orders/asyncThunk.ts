import { createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "@/services/orderService";
import { CheckoutInformationType } from "@/models/orderModel";

export const storeName = "productsSlice";

export const createOrder = createAsyncThunk(
  `${storeName}/createOrder`,
  async (values: CheckoutInformationType) => {
    const resp = await orderService.createOrder(values);
    return resp;
  }
);

export const fetchOrdersByAccountId = createAsyncThunk(
  `${storeName}/fetchOrdersByAccountID`,
  async (accountID: string) => {
    const resp = await orderService.fetchOrdersByAccountId(accountID);
    return resp;
  }
);