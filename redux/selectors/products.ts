import { ProductDetailType } from "@/models/productDetailModel";
import { getProductsDetailSlice } from "../entities/productsDetail";
import { createSelector } from "@reduxjs/toolkit";

export const getProductDetail = createSelector(
  [getProductsDetailSlice],
  (entities) => {
    const result: ProductDetailType = entities;
    return result;
  }
);
