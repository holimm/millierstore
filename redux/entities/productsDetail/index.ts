import { createSlice } from "@reduxjs/toolkit";
import { fetchProductDetailById } from "./asyncThunk";
import { PayloadAction } from "@reduxjs/toolkit";
import { ProductDetailType } from "@/models/productDetailModel";
import { ResponseBEType } from "@/models/common";
import { storeName } from "./asyncThunk";

export interface productDetailEntityType {
  ids: { [key: string]: ProductDetailType };
  loading: boolean;
}

export const productsDetailSlice = createSlice({
  name: storeName,
  initialState: {
    ids: {},
    loading: false,
  },
  reducers: {
    saveDetailProduct(state, action: PayloadAction<ProductDetailType>) {
      state.ids[action.payload._id] = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetailById.pending, (state, { payload }) => {
      productsDetailSlice.caseReducers.setLoading(state, {
        payload: true,
        type: `${storeName}/setLoading`,
      });
    });
    builder.addCase(fetchProductDetailById.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<ProductDetailType>;
      productsDetailSlice.caseReducers.saveDetailProduct(state, {
        payload: data,
        type: `${storeName}/saveDetailProduct`,
      });
      productsDetailSlice.caseReducers.setLoading(state, {
        payload: false,
        type: `${storeName}/setLoading`,
      });
    });
  },
});

export * from "./asyncThunk";
export const { saveDetailProduct, setLoading } = productsDetailSlice.actions;
export default productsDetailSlice.reducer;

export const getProductsDetailSlice = (
  state: any
): { [key: string]: ProductDetailType } => state[storeName].ids;

export const getProductsDetailLoading = (state: boolean) =>
  state[storeName].loading;
