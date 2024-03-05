import { createSelector } from "@reduxjs/toolkit";
import {
  getUserData,
  getUserDataChangingInformationLoading,
  getUserDataChangingPasswordLoading,
  getUserDataCreateAccountLoading,
  getUserDataCreateAccountSendEmailLoading,
  getUserDataCreateAddressLoading,
  getUserDataDeleteAddressLoading,
  getUserDataLoading,
  getUserDataResetPasswordLoading,
  getUserDataResetPasswordSendEmailLoading,
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
    const result: { status: string; value: string } = entities;
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

export const getUserResetPasswordSendEmailLoading = createSelector(
  [getUserDataResetPasswordSendEmailLoading],
  (entities) => {
    const result: boolean = entities;
    return { data: result };
  }
);

export const getUserResetPasswordLoading = createSelector(
  [getUserDataResetPasswordLoading],
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
