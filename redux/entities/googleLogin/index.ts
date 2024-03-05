import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfoLoginGoogle } from "./asyncThunk";
import { PayloadAction } from "@reduxjs/toolkit";
import { ResponseBEType } from "@/models/common";
import { storeName } from "./asyncThunk";
import { CategoryType, ProductsType } from "@/models/productModel";
import { isEmpty } from "lodash";
import { notificationMessage } from "@/helpers/commonHelpers";
import { UserType } from "@/models/userModel";

export interface productDetailEntityType {
  loadingLoginGoogle: boolean;
}

export const googleLoginSlice = createSlice({
  name: storeName,
  initialState: {
    loadingLoginGoogle: false,
  },
  reducers: {
    setLoadingLoginGoogle(state, action) {
      state.loadingLoginGoogle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfoLoginGoogle.pending, (state, { payload }) => {
      googleLoginSlice.caseReducers.setLoadingLoginGoogle(state, {
        payload: true,
        type: `${storeName}/setLoadingLoginGoogle`,
      });
    });
    builder.addCase(
      fetchUserInfoLoginGoogle.fulfilled,
      (state, { payload }) => {
        const { data } = payload as ResponseBEType<UserType>;
        googleLoginSlice.caseReducers.setLoadingLoginGoogle(state, {
          payload: false,
          type: `${storeName}/setLoadingLoginGoogle`,
        });
        notificationMessage({
          type: "success",
          content: "Logged in successfully",
        });
        localStorage.setItem("signin_token", data.token);
        window.dispatchEvent(new Event("account_update_information"));
      }
    );
    builder.addCase(fetchUserInfoLoginGoogle.rejected, (state, { error }) => {
      googleLoginSlice.caseReducers.setLoadingLoginGoogle(state, {
        payload: false,
        type: `${storeName}/setLoadingLoginGoogle`,
      });
      notificationMessage({ type: "error", content: error.message });
    });
  },
});

export * from "./asyncThunk";
export const { setLoadingLoginGoogle } = googleLoginSlice.actions;
export default googleLoginSlice.reducer;

export const getLoginGoogleLoadingData = (state: boolean) =>
  state[storeName].loadingLoginGoogle;
