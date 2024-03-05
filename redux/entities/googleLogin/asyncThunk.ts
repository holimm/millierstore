import { createAsyncThunk } from "@reduxjs/toolkit";
import productDetailService from "@/services/productDetailService";
import productService from "@/services/productService";
import googleLoginService from "@/services/googleLoginService";
import { GoogleLoginCodeResponseType } from "@/models/userModel";
import { isEmpty } from "lodash";

export const storeName = "googleLoginSlice";

export const fetchUserInfoLoginGoogle = createAsyncThunk(
  `${storeName}/fetchUserInfoLoginGoogle`,
  async (values: GoogleLoginCodeResponseType) => {
    const resp = await googleLoginService.fetchUserInfoLoginGoogle(values);
    if (resp.status === "error") throw resp.data;
    return resp;
  }
);
