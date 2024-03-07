import { createAsyncThunk } from "@reduxjs/toolkit";
import { CheckoutInformationType } from "@/models/orderModel";
import blogService from "@/services/blogService";

export const storeName = "productsSlice";

export const fetchBlogs = createAsyncThunk(
  `${storeName}/fetchBlogs`,
  async (args?: { params?: { category?: string } }) => {
    const resp = await blogService.fetchBlogs(args);
    return resp;
  }
);

export const fetchDetailBlog = createAsyncThunk(
  `${storeName}/fetchDetailBlog`,
  async (args?: { params?: { idTitle: string } }) => {
    const resp = await blogService.fetchDetailBlog(args);
    return resp;
  }
);
