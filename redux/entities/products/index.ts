import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory, fetchProducts } from "./asyncThunk";
import { PayloadAction } from "@reduxjs/toolkit";
import { ResponseBEType } from "@/models/common";
import { storeName } from "./asyncThunk";
import { CategoryType, ProductsType } from "@/models/productModel";

export interface productDetailEntityType {
  ids: { [key: string]: ProductsType };
  idsCategory: CategoryType[];
  loading: boolean;
  loadingCategory: boolean;
}

export const productsSlice = createSlice({
  name: storeName,
  initialState: {
    ids: {},
    idsCategory: [],
    loading: false,
    loadingCategory: false,
  },
  reducers: {
    saveProducts(state, action: PayloadAction<ProductsType[]>) {
      (action.payload || []).forEach((element) => {
        if (element.category) state.ids[element.category] = action.payload;
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
  },
});

export * from "./asyncThunk";
export const { saveProducts, setLoading, saveCategory, setLoadingCategory } =
  productsSlice.actions;
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
