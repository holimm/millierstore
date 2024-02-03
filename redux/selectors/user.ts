import { createSelector } from "@reduxjs/toolkit";
import { getCartList } from "../entities/cart";
import { CartType } from "@/models/cartModel";
import {
  getUserData,
  getUserDataChangingInformationLoading,
  getUserDataChangingPasswordLoading,
  getUserDataLoading,
  getUserDataUpdateAddressLoading,
} from "../entities/users";
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

export const getUserChangingInformationLoading = createSelector(
  [getUserDataChangingPasswordLoading],
  (entities) => {
    const result: boolean = entities;
    return result;
  }
);

export const getUserChangingPasswordLoading = createSelector(
  [getUserDataChangingInformationLoading],
  (entities) => {
    const result: boolean = entities;
    return result;
  }
);

export const getUserUpdateAddressLoading = createSelector(
  [getUserDataUpdateAddressLoading],
  (entities) => {
    const result: boolean = entities;
    return result;
  }
);
