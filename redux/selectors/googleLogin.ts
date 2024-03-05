import { createSelector } from "@reduxjs/toolkit";
import { getLoginGoogleLoadingData } from "../entities/googleLogin";

export const getLoginGoogleLoading = createSelector(
  [getLoginGoogleLoadingData],
  (entities) => {
    const result: boolean = entities;
    return { data: result };
  }
);
