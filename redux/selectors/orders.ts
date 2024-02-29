import { createSelector } from "@reduxjs/toolkit";
import {
  getCreateOrderLoadingData,
  getOrdersData,
  getOrdersLoadingData,
} from "../entities/orders";
import { CheckoutInformationType } from "@/models/orderModel";

export const getOrders = createSelector(
  [getOrdersData, getOrdersLoadingData],
  (entities, loading) => {
    const result: CheckoutInformationType[] = entities;
    return { data: result, loading: loading };
  }
);

export const getCreateOrderLoading = createSelector(
  [getCreateOrderLoadingData],
  (entities) => {
    const result: boolean = entities;
    return { data: result };
  }
);
