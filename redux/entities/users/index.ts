import { notificationMessage } from "@/helpers/commonHelpers";
import { CartType } from "@/models/cartModel";
import {
  ProductColorType,
  ProductStorageType,
} from "@/models/productDetailModel";
import { UserType } from "@/models/userModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { isEmpty } from "lodash";
import { fetchUserSession, fetchUserSignIn } from "./asyncThunk";
import { ResponseBEType } from "@/models/common";

export const storeName = "userSlice";

export const userSlice = createSlice({
  name: storeName,
  initialState: {
    user: {},
    loading: false,
  },
  reducers: {
    saveUser(state, action: PayloadAction<UserType | {}>) {
      state.user = action.payload;
    },
    setUserLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserSignIn.pending, (state, { payload }) => {
      userSlice.caseReducers.setUserLoading(state, {
        payload: true,
        type: `${storeName}/setUserLoading`,
      });
    });
    builder.addCase(fetchUserSignIn.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<UserType>;
      userSlice.caseReducers.saveUser(state, {
        payload: data,
        type: `${storeName}/saveUser`,
      });
      userSlice.caseReducers.setUserLoading(state, {
        payload: false,
        type: `${storeName}/setUserLoading`,
      });
      notificationMessage({
        type: "success",
        content: "Logged in successfully",
      });
      sessionStorage.setItem("signin_token", data.token);
    });
    builder.addCase(fetchUserSignIn.rejected, (state, { error }) => {
      userSlice.caseReducers.setUserLoading(state, {
        payload: false,
        type: `${storeName}/setUserLoading`,
      });
      notificationMessage({ type: "error", content: error.message });
    });

    builder.addCase(fetchUserSession.pending, (state, { payload }) => {
      userSlice.caseReducers.setUserLoading(state, {
        payload: true,
        type: `${storeName}/setUserLoading`,
      });
    });
    builder.addCase(fetchUserSession.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<UserType>;
      userSlice.caseReducers.saveUser(state, {
        payload: data,
        type: `${storeName}/saveUser`,
      });
      userSlice.caseReducers.setUserLoading(state, {
        payload: false,
        type: `${storeName}/setUserLoading`,
      });
    });
    builder.addCase(fetchUserSession.rejected, (state, { error }) => {
      userSlice.caseReducers.setUserLoading(state, {
        payload: false,
        type: `${storeName}/setUserLoading`,
      });
      notificationMessage({ type: "error", content: error.message });
    });
  },
});

export const { saveUser, setUserLoading } = userSlice.actions;
export default userSlice.reducer;

export const getUserData = (state: UserType) => state[storeName].user;
export const getUserDataLoading = (state: boolean) => state[storeName].loading;
