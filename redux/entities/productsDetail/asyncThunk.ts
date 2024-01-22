import { createAsyncThunk } from "@reduxjs/toolkit";
import productDetailService from "@/services/productDetailService";

export const storeName = "productsDetailSlice";

export const fetchProductDetailById = createAsyncThunk(
  `${storeName}/fetchProductDetailById`,
  async (code: string) => {
    const resp = await productDetailService.getOne(code);
    return resp.data;
  }
);
