import { createSelector } from "@reduxjs/toolkit";
import { getCartList } from "../entities/cart";
import { CartType } from "@/models/cartModel";
import { getUserData, getUserDataLoading } from "../entities/users";
import { UserType } from "@/models/userModel";

export const getUser = createSelector([getUserData], (entities) => {
  const result: UserType = entities;
  return result;
});

export const getUserSigninLoading = createSelector(
  [getUserDataLoading],
  (entities) => {
    const result: boolean = entities;
    return result;
  }
);
