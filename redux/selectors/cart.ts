import { createSelector } from "@reduxjs/toolkit";
import { getCartList } from "../entities/cart";
import { CartType } from "@/models/cartModel";

export const getCart = createSelector([getCartList], (entities) => {
  const result: CartType[] = entities;
  return result;
});
