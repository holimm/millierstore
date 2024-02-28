import { createSelector } from "@reduxjs/toolkit";
import {
  getCreateOrderLoadingData,
  getOrdersData,
  getOrdersLoadingData,
} from "../entities/orders";
import { CheckoutInformationType } from "@/models/orderModel";

export const getOrders = createSelector([getOrdersData], (entities) => {
  const result: CheckoutInformationType[] = entities;
  return result;
});

export const getOrdersLoading = createSelector(
  [getOrdersLoadingData],
  (entities) => {
    const result: boolean = entities;
    return result;
  }
);

export const getCreateOrderLoading = createSelector(
  [getCreateOrderLoadingData],
  (entities) => {
    const result: boolean = entities;
    return result;
  }
);
