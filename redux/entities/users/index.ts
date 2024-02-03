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
import {
  fetchUserSession,
  fetchUserSignIn,
  updateUserAddress,
  updateUserInformation,
  updateUserPassword,
} from "./asyncThunk";
import { ResponseBEType } from "@/models/common";

export const storeName = "userSlice";

export const userSlice = createSlice({
  name: storeName,
  initialState: {
    user: {},
    loading: false,
    loadingChangingInformation: false,
    loadingChangingPassword: false,
    loadingUpdateAddress: false,
  },
  reducers: {
    saveUser(state, action: PayloadAction<UserType | {}>) {
      state.user = action.payload;
    },
    setUserLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUserLoadingChangingInformation(state, action: PayloadAction<boolean>) {
      state.loadingChangingInformation = action.payload;
    },
    setUserLoadingChangingPassword(state, action: PayloadAction<boolean>) {
      state.loadingChangingPassword = action.payload;
    },
    setUserLoadingUpdateAddress(state, action: PayloadAction<boolean>) {
      state.loadingUpdateAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    //USER LOG IN
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
    //USER REVISIT SESSION
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
    //USER CHANGING INFORMATION
    builder.addCase(updateUserInformation.pending, (state, { payload }) => {
      userSlice.caseReducers.setUserLoadingChangingInformation(state, {
        payload: true,
        type: `${storeName}/setUserLoadingChangingInformation`,
      });
    });
    builder.addCase(updateUserInformation.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<string>;
      notificationMessage({ type: "success", content: data });
      userSlice.caseReducers.setUserLoadingChangingInformation(state, {
        payload: false,
        type: `${storeName}/setUserLoadingChangingInformation`,
      });
    });
    builder.addCase(updateUserInformation.rejected, (state, { error }) => {
      userSlice.caseReducers.setUserLoadingChangingInformation(state, {
        payload: false,
        type: `${storeName}/setUserLoadingChangingInformation`,
      });
      notificationMessage({ type: "error", content: error.message });
    });
    //USER CHANGING PASSWORD
    builder.addCase(updateUserPassword.pending, (state, { payload }) => {
      userSlice.caseReducers.setUserLoadingChangingPassword(state, {
        payload: true,
        type: `${storeName}/setUserLoadingChangingPassword`,
      });
    });
    builder.addCase(updateUserPassword.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<string>;
      notificationMessage({ type: "success", content: data });
      userSlice.caseReducers.setUserLoadingChangingPassword(state, {
        payload: false,
        type: `${storeName}/setUserLoadingChangingPassword`,
      });
    });
    builder.addCase(updateUserPassword.rejected, (state, { error }) => {
      userSlice.caseReducers.setUserLoadingChangingPassword(state, {
        payload: false,
        type: `${storeName}/setUserLoadingChangingPassword`,
      });
      notificationMessage({ type: "error", content: error.message });
    });
    //USER UPDATING ADDRESS
    builder.addCase(updateUserAddress.pending, (state, { payload }) => {
      userSlice.caseReducers.setUserLoadingUpdateAddress(state, {
        payload: true,
        type: `${storeName}/setUserLoadingUpdateAddress`,
      });
    });
    builder.addCase(updateUserAddress.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<string>;
      notificationMessage({ type: "success", content: data });
      userSlice.caseReducers.setUserLoadingUpdateAddress(state, {
        payload: false,
        type: `${storeName}/setUserLoadingUpdateAddress`,
      });
    });
    builder.addCase(updateUserAddress.rejected, (state, { error }) => {
      userSlice.caseReducers.setUserLoadingUpdateAddress(state, {
        payload: false,
        type: `${storeName}/setUserLoadingUpdateAddress`,
      });
      notificationMessage({ type: "error", content: error.message });
    });
  },
});

export const {
  saveUser,
  setUserLoading,
  setUserLoadingChangingPassword,
  setUserLoadingUpdateAddress,
} = userSlice.actions;
export default userSlice.reducer;

export const getUserData = (state: UserType) => state[storeName].user;
export const getUserDataLoading = (state: boolean) => state[storeName].loading;
export const getUserDataChangingInformationLoading = (state: boolean) =>
  state[storeName].loadingChangingInformation;
export const getUserDataChangingPasswordLoading = (state: boolean) =>
  state[storeName].loadingChangingPassword;
export const getUserDataUpdateAddressLoading = (state: boolean) =>
  state[storeName].loadingUpdateAddress;