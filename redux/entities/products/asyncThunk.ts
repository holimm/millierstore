import { createAsyncThunk } from "@reduxjs/toolkit";
import productDetailService from "@/services/productDetailService";
import productService from "@/services/productService";

export const storeName = "productsSlice";

export const fetchProducts = createAsyncThunk(
  `${storeName}/fetchProducts`,
  async (args: { params?: { name?: string; category?: string } }) => {
    const resp = await productService.getAll(args);
    return resp;
  }
);

export const fetchProductsSearch = createAsyncThunk(
  `${storeName}/fetchProductsSearch`,
  async (args: { params?: { name: string } }) => {
    const resp = await productService.getAllSearch(args);
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
