import { ProductDetailType } from "@/models/productDetailModel";
import { createSelector } from "@reduxjs/toolkit";
import {
  getBlogsData,
  getBlogsLoadingData,
  getDetailBlogData,
  getDetailBlogLoadingData,
} from "../entities/blogs";
import { BlogType } from "@/models/blogModel";

export const getBlogs = createSelector(
  [getBlogsData, getBlogsLoadingData],
  (entities, loading) => {
    const result: BlogType[] = entities;
    return { data: result, loading: loading };
  }
);

export const getDetailBlog = createSelector(
  [getDetailBlogData, getDetailBlogLoadingData],
  (entities, loading) => {
    const result: BlogType = entities;
    return { data: result, loading: loading };
  }
);
