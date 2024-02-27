import { createSelector } from "@reduxjs/toolkit";
import { getCreateOrderLoadingData } from "../entities/orders";
import { CheckoutInformationType } from "@/models/checkoutModel";

export const getCreateOrderLoading = createSelector(
  [getCreateOrderLoadingData],
  (entities) => {
    const result: CheckoutInformationType = entities;
    return result;
  }
);
