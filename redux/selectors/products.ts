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

export const getProducts = createSelector(
  [getProductsSlice, getProductsEntityLoading],
  (entities, loading) => {
    const result: ProductDetailType = entities;
    return { data: result, loading: loading };
  }
);

export const getProductsSearch = createSelector(
  [getProductSearchSlice, getProductSearchEntityLoading],
  (entities, loading) => {
    const result: ProductsType[] = entities;
    return { data: result, loading: loading };
  }
);

export const getCategory = createSelector(
  [getCategorySlice, getCategoryEntityLoading],
  (entities, loading) => {
    const result: CategoryType[] = entities;
    return { data: result, loading: loading };
  }
);

export const getProductDetail = createSelector(
  [getProductsDetailSlice, getProductsDetailLoading],
  (entities, loading) => {
    const result: ProductDetailType = entities;
    return { data: result, loading: loading };
  }
);
