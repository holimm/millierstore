import { createAsyncThunk } from "@reduxjs/toolkit";
import productDetailService from "@/services/productDetailService";
import productService from "@/services/productService";

export const storeName = "productsSlice";

export const fetchProducts = createAsyncThunk(
  `${storeName}/fetchProducts`,
  async () => {
    const resp = await productService.getAll();
    return resp;
  }
);

export const fetchCategory = createAsyncThunk(
  `${storeName}/fetchCategory`,
  async () => {
    const resp = await productService.getAllCategory();
    return resp;
  }
);
