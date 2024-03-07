import { notificationMessage } from "@/helpers/commonHelpers";
import { CheckoutInformationType } from "@/models/orderModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import { ResponseBEType } from "@/models/common";
import { fetchBlogs, fetchDetailBlog } from "./asyncThunk";
import { BlogType } from "@/models/blogModel";

const storeName = "blogsSlice";

export const blogsSlice = createSlice({
  name: storeName,
  initialState: {
    idsBlogs: [],
    idsDetailBlog: [],
    loadingBlogs: false,
    loadingDetailBlog: false,
  },
  reducers: {
    saveBlogs(state, action: PayloadAction<BlogType[]>) {
      state.idsBlogs = action.payload;
    },
    saveDetailBlog(state, action: PayloadAction<BlogType[]>) {
      state.idsDetailBlog = action.payload;
    },
    setLoadingBlogs(state, action: PayloadAction<boolean>) {
      state.loadingBlogs = action.payload;
    },
    setLoadingDetailBlog(state, action: PayloadAction<boolean>) {
      state.loadingDetailBlog = action.payload;
    },
  },
  extraReducers: (builder) => {
    //GET ALL BLOGS
    builder.addCase(fetchBlogs.pending, (state, { payload }) => {
      blogsSlice.caseReducers.setLoadingBlogs(state, {
        payload: true,
        type: `${storeName}/setLoadingBlogs`,
      });
    });
    builder.addCase(fetchBlogs.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<BlogType[]>;
      blogsSlice.caseReducers.saveBlogs(state, {
        payload: data,
        type: `${storeName}/saveBlogs`,
      });
      blogsSlice.caseReducers.setLoadingBlogs(state, {
        payload: false,
        type: `${storeName}/setLoadingBlogs`,
      });
    });
    //GET ALL BLOGS
    builder.addCase(fetchDetailBlog.pending, (state, { payload }) => {
      blogsSlice.caseReducers.setLoadingDetailBlog(state, {
        payload: true,
        type: `${storeName}/setLoadingDetailBlog`,
      });
    });
    builder.addCase(fetchDetailBlog.fulfilled, (state, { payload }) => {
      const { data } = payload as ResponseBEType<BlogType[]>;
      blogsSlice.caseReducers.saveDetailBlog(state, {
        payload: data,
        type: `${storeName}/saveDetailBlog`,
      });
      blogsSlice.caseReducers.setLoadingDetailBlog(state, {
        payload: false,
        type: `${storeName}/setLoadingDetailBlog`,
      });
    });
  },
});

export const {
  saveBlogs,
  saveDetailBlog,
  setLoadingBlogs,
  setLoadingDetailBlog,
} = blogsSlice.actions;
export default blogsSlice.reducer;

export const getBlogsData = (state: any): BlogType[] =>
  state[storeName].idsBlogs;
export const getBlogsLoadingData = (state: boolean) =>
  state[storeName].loadingBlogs;
export const getDetailBlogData = (state: any): BlogType =>
  state[storeName].idsDetailBlog;
export const getDetailBlogLoadingData = (state: boolean) =>
  state[storeName].loadingDetailBlog;
