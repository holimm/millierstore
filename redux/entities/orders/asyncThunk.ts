import { createAsyncThunk } from "@reduxjs/toolkit";
import productDetailService from "@/services/productDetailService";
import productService from "@/services/productService";
import orderService from "@/services/orderService";
import { CheckoutInformationType } from "@/models/checkoutModel";

export const storeName = "productsSlice";

export const createOrder = createAsyncThunk(
  `${storeName}/createOrder`,
  async (values: CheckoutInformationType) => {
    const resp = await orderService.createOrder(values);
    return resp;
  }
);
