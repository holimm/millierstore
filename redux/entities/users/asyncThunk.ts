import { createAsyncThunk } from "@reduxjs/toolkit";
import { storeName } from ".";
import userService from "@/services/userService";
import { UserType } from "@/models/userModel";

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
