import { ThunkAction, configureStore, combineReducers } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { productsDetailSlice } from "./entities/productsDetail";
import { productsSlice } from "./entities/products";
import { cartSlice } from "./entities/cart";
import { userSlice } from "./entities/users";
import { orderSlice } from "./entities/orders";
import { googleLoginSlice } from "./entities/googleLogin";
import { blogsSlice } from "./entities/blogs";
import { contactSlice } from "./entities/contact";

export const store = configureStore({
  reducer: combineReducers({
    [productsDetailSlice.name]: productsDetailSlice.reducer,
    [productsSlice.name]: productsSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
    [blogsSlice.name]: blogsSlice.reducer,
    [googleLoginSlice.name]: googleLoginSlice.reducer,
    [contactSlice.name]: contactSlice.reducer,
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
