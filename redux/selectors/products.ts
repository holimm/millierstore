import { ProductDetailType } from "@/models/productDetailModel";
import {
  getProductsDetailLoading,
  getProductsDetailSlice,
} from "../entities/productsDetail";
import { createSelector } from "@reduxjs/toolkit";

export const getProductDetail = createSelector(
  [getProductsDetailSlice],
  (entities) => {
    const result: ProductDetailType = entities;
    return result;
  }
);

export const getProductDetailLoading = createSelector(
  [getProductsDetailLoading],
  (entities) => {
    const result: boolean = entities;
    return result;
  }
);
