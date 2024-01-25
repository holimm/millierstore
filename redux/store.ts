import { ThunkAction, configureStore, combineReducers } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { productsDetailSlice } from "./entities/productsDetail";
import { productsSlice } from "./entities/products";

export const store = configureStore({
  reducer: combineReducers({
    [productsDetailSlice.name]: productsDetailSlice.reducer,
    [productsSlice.name]: productsSlice.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.APP_ENV !== "production" ? { name: "STUD" } : false,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkAction<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
>;
