import { ContactFormType } from "@/models/contactModel";
import { getCreateContactNodeLoadingData } from "../entities/contact";
import { createSelector } from "@reduxjs/toolkit";

export const loadingCreateContactNode = createSelector(
  [getCreateContactNodeLoadingData],
  (entities) => {
    const result: boolean = entities;
    return { data: result };
  }
);
