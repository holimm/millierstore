import { UserType } from "@/models/userModel";
import axiosMongo from "@/network/axiosMongo";
import { fetchUserSession } from "@/redux/entities/users/asyncThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/selectors/user";
import userService from "@/services/userService";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";

export const useAuthen = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUser);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!isEmpty(sessionStorage.getItem("signin_token")))
      setToken(sessionStorage.getItem("signin_token"));
  }, []);

  useEffect(() => {
    if (!isEmpty(token)) {
      dispatch(fetchUserSession(token));
    }
  }, [token]);

  return !isEmpty(userData) ? userData : false;
};
