import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategory,
  fetchProducts,
  fetchProductsSearch,
} from "./asyncThunk";
import { PayloadAction } from "@reduxjs/toolkit";
import { ResponseBEType } from "@/models/common";
import { storeName } from "./asyncThunk";
import { CategoryType, ProductsType } from "@/models/productModel";
import { isEmpty } from "lodash";

export interface productDetailEntityType {
  ids: { [key: string]: ProductsType[] };
  idsCategory: CategoryType[];
  idsSearch: ProductsType[];
  loading: boolean;
  loadingCategory: boolean;
  loadingSearch: boolean;
}

export const productsSlice = createSlice({
  name: storeName,
  initialState: {
    ids: {},
    idsCategory: [],
    idsSearch: [],
    loading: false,
    loadingCategory: false,
    loadingSearch: false,
  },
  reducers: {
    saveProducts(state, action: PayloadAction<ProductsType[]>) {
      state.ids = {};
      (action.payload || []).forEach((element) => {
        const category = element.category;
        if (element.category && !state.ids[category]) {
          state.ids[category] = [element];
        } else state.ids[category].push(element);
      });
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    saveCategory(state, action: PayloadAction<CategoryType[]>) {
      state.idsCategory = action.payload;
    },
    setLoadingCategory(state, action) {
      state.loadingCategory = action.payload;
    },
    saveProductsSearch(state, action: PayloadAction<CategoryType[]>) {
      state.idsSearch = action.payload;
    },
    setLoadingProductsSearch(state, action) {
      state.loadingSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, { payload }) => {
      productsSlice.caseReducers.setLoading(state, {
        payload: true,
        type: `${storeName}/setLoading`,
      });
    });
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<ProductsType[]>;
      productsSlice.caseReducers.saveProducts(state, {
        payload: data,
        type: `${storeName}/saveProducts`,
      });
      productsSlice.caseReducers.setLoading(state, {
        payload: false,
        type: `${storeName}/setLoading`,
      });
    });
    builder.addCase(fetchCategory.pending, (state, { payload }) => {
      productsSlice.caseReducers.setLoadingCategory(state, {
        payload: true,
        type: `${storeName}/setLoadingCategory`,
      });
    });
    builder.addCase(fetchCategory.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<CategoryType[]>;
      productsSlice.caseReducers.saveCategory(state, {
        payload: data,
        type: `${storeName}/saveCategory`,
      });
      productsSlice.caseReducers.setLoadingCategory(state, {
        payload: false,
        type: `${storeName}/setLoadingCategory`,
      });
    });
    builder.addCase(fetchProductsSearch.pending, (state, { payload }) => {
      productsSlice.caseReducers.setLoadingProductsSearch(state, {
        payload: true,
        type: `${storeName}/setLoadingProductsSearch`,
      });
    });
    builder.addCase(fetchProductsSearch.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<CategoryType[]>;
      productsSlice.caseReducers.saveProductsSearch(state, {
        payload: data,
        type: `${storeName}/saveProductsSearch`,
      });
      productsSlice.caseReducers.setLoadingProductsSearch(state, {
        payload: false,
        type: `${storeName}/setLoadingProductsSearch`,
      });
    });
  },
});

export * from "./asyncThunk";
export const {
  saveProducts,
  setLoading,
  saveCategory,
  setLoadingCategory,
  saveProductsSearch,
  setLoadingProductsSearch,
} = productsSlice.actions;
export default productsSlice.reducer;

export const getProductsSlice = (
  state: any
): { [key: string]: ProductsType[] } => state[storeName].ids;

export const getProductsEntityLoading = (state: boolean) =>
  state[storeName].loading;

export const getCategorySlice = (state: any): CategoryType[] =>
  state[storeName].idsCategory;

export const getCategoryEntityLoading = (state: boolean) =>
  state[storeName].loadingCategory;

export const getProductSearchSlice = (state: any): ProductsType[] =>
  state[storeName].idsSearch;

export const getProductSearchEntityLoading = (state: boolean) =>
  state[storeName].loadingSearch;
