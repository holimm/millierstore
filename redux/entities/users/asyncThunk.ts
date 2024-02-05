import { createAsyncThunk } from "@reduxjs/toolkit";
import { storeName } from ".";
import userService from "@/services/userService";
import { UserAddressType, UserType } from "@/models/userModel";
import {
  FieldProfileInformationType,
  FieldProfilePasswordType,
} from "@/models/common";
import { notificationMessage } from "@/helpers/commonHelpers";

export const fetchUserSignIn = createAsyncThunk(
  `${storeName}/fetchUserSignIn`,
  async (values: UserType) => {
    const resp = await userService.signIn(values);
    if (resp.status === "error") throw resp.data;
    return resp;
  }
);
export const fetchUserSession = createAsyncThunk(
  `${storeName}/fetchUserSession`,
  async (token: string) => {
    const resp = await userService.sessionSignIn(token);
    if (resp.status === "error") throw resp.data;
    return resp;
  }
);
export const updateUserInformation = createAsyncThunk(
  `${storeName}/updateUserInformation`,
  async (values: FieldProfileInformationType) => {
    const resp = await userService.updateInformation(values);
    if (resp.status === "error") throw resp.data;
    return resp;
  }
);
export const updateUserPassword = createAsyncThunk(
  `${storeName}/updateUserPassword`,
  async (values: FieldProfilePasswordType) => {
    const resp = await userService.updatePassword(values);
    if (resp.status === "error") throw resp.data;
    return resp;
  }
);
export const createUserAddress = createAsyncThunk(
  `${storeName}/createUserAddress`,
  async (values: UserAddressType) => {
    const resp = await userService.createAddress(values);
    if (resp.status === "error") throw resp.data;
    return resp;
  }
);
export const updateUserAddress = createAsyncThunk(
  `${storeName}/updateUserAddress`,
  async (values: UserAddressType) => {
    const resp = await userService.updateAddress(values);
    if (resp.status === "error") throw resp.data;
    return resp;
  }
);
export const deleteUserAddress = createAsyncThunk(
  `${storeName}/deleteUserAddress`,
  async (values: UserAddressType) => {
    const resp = await userService.deleteAddress(values);
    if (resp.status === "error") throw resp.data;
    return resp;
  }
);
