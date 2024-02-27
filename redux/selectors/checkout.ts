import { createSelector } from "@reduxjs/toolkit";
import { getCheckoutInformationData } from "../entities/checkout";
import { CheckoutInformationType } from "@/models/checkoutModel";

export const getCheckoutInformation = createSelector(
  [getCheckoutInformationData],
  (entities) => {
    const result: CheckoutInformationType = entities;
    return result;
  }
);
