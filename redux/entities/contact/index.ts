import { notificationMessage } from "@/helpers/commonHelpers";
import { CheckoutInformationType } from "@/models/orderModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { createContactNode } from "./asyncThunk";
import { ResponseBEType } from "@/models/common";

const storeName = "contactSlice";

export const contactSlice = createSlice({
  name: storeName,
  initialState: {
    loadingCreateContactNode: false,
  },
  reducers: {
    setLoadingCreateContactNode(state, action: PayloadAction<boolean>) {
      state.loadingCreateContactNode = action.payload;
    },
  },
  extraReducers: (builder) => {
    //LOADING CREATE CONTACT NODE
    builder.addCase(createContactNode.pending, (state, { payload }) => {
      contactSlice.caseReducers.setLoadingCreateContactNode(state, {
        payload: true,
        type: `${storeName}/setLoadingCreateContactNode`,
      });
    });
    builder.addCase(createContactNode.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<string>;
      contactSlice.caseReducers.setLoadingCreateContactNode(state, {
        payload: false,
        type: `${storeName}/setLoadingCreateContactNode`,
      });
      notificationMessage({
        type: "success",
        content: data,
      });
    });
    builder.addCase(createContactNode.rejected, (state, { error }) => {
      contactSlice.caseReducers.setLoadingCreateContactNode(state, {
        payload: false,
        type: `${storeName}/setLoadingCreateContactNode`,
      });
      notificationMessage({ type: "error", content: error.message });
    });
  },
});

export const { setLoadingCreateContactNode } = contactSlice.actions;
export default contactSlice.reducer;

export const getCreateContactNodeLoadingData = (state: boolean) =>
  state[storeName].loadingCreateContactNode;
