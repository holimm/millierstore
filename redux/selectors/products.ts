import { ProductDetailType } from "@/models/productDetailModel";
import {
  getProductsDetailLoading,
  getProductsDetailSlice,
} from "../entities/productsDetail";
import { createSelector } from "@reduxjs/toolkit";
import {
  getCategoryEntityLoading,
  getCategorySlice,
  getProductSearchEntityLoading,
  getProductSearchSlice,
  getProductsSlice,
} from "../entities/products";
import { CategoryType, ProductsType } from "@/models/productModel";
import { getProductsEntityLoading } from "../entities/products";

export const getProducts = createSelector([getProductsSlice], (entities) => {
  const result: ProductDetailType = entities;
  return result;
});

export const getProductsLoading = createSelector(
  [getProductsEntityLoading],
  (entities) => {
    const result: boolean = entities;
    return result;
  }
);

export const getProductsSearch = createSelector(
  [getProductSearchSlice],
  (entities) => {
    const result: ProductsType[] = entities;
    return result;
  }
);

export const getProductsSearchLoading = createSelector(
  [getProductSearchEntityLoading],
  (entities) => {
    const result: boolean = entities;
    return result;
  }
);

export const getCategory = createSelector([getCategorySlice], (entities) => {
  const result: CategoryType[] = entities;
  return result;
});

export const getCategoryLoading = createSelector(
  [getCategoryEntityLoading],
  (entities) => {
    const result: boolean = entities;
    return result;
  }
);

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
