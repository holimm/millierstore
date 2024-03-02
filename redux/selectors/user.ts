import { createSelector } from "@reduxjs/toolkit";
import { getCartList } from "../entities/cart";
import { CartType } from "@/models/cartModel";
import {
  getUserData,
  getUserDataChangingInformationLoading,
  getUserDataChangingPasswordLoading,
  getUserDataCreateAccountLoading,
  getUserDataCreateAccountSendEmailLoading,
  getUserDataCreateAddressLoading,
  getUserDataDeleteAddressLoading,
  getUserDataLoading,
  getUserDataUpdateAddressLoading,
} from "../entities/users";
import { UserType } from "@/models/userModel";

export const getUser = createSelector([getUserData], (entities) => {
  const result: UserType = entities;
  return { data: result };
});

export const getUserSigninLoading = createSelector(
  [getUserDataLoading],
  (entities) => {
    const result: boolean = entities;
    return { data: result };
  }
);

export const getUserCreateAccountLoading = createSelector(
  [getUserDataCreateAccountLoading],
  (entities) => {
    const result: { status: string } = entities;
    return { data: result };
  }
);

export const getUserCreateAccountSendEmailLoading = createSelector(
  [getUserDataCreateAccountSendEmailLoading],
  (entities) => {
    const result: boolean = entities;
    return { data: result };
  }
);

export const getUserChangingInformationLoading = createSelector(
  [getUserDataChangingInformationLoading],
  (entities) => {
    const result: boolean = entities;
    return { data: result };
  }
);

export const getUserChangingPasswordLoading = createSelector(
  [getUserDataChangingPasswordLoading],
  (entities) => {
    const result: boolean = entities;
    return { data: result };
  }
);

export const getUserCreateAddressLoading = createSelector(
  [getUserDataCreateAddressLoading],
  (entities) => {
    const result: boolean = entities;
    return { data: result };
  }
);

export const getUserUpdateAddressLoading = createSelector(
  [getUserDataUpdateAddressLoading],
  (entities) => {
    const result: boolean = entities;
    return { data: result };
  }
);

export const getUserDeleteAddressLoading = createSelector(
  [getUserDataDeleteAddressLoading],
  (entities) => {
    const result: boolean = entities;
    return { data: result };
  }
);
