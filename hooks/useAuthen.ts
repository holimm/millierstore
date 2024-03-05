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
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const handleStorage = (event) => {
      setRefresh(!refresh);
    };
    window.addEventListener("account_update_information", handleStorage);
    return () =>
      window.removeEventListener("account_update_information", handleStorage);
  }, [refresh]);

  useEffect(() => {
    if (!isEmpty(localStorage.getItem("signin_token")))
      setToken(localStorage.getItem("signin_token"));
  }, [refresh]);

  useEffect(() => {
    if (!isEmpty(token)) {
      dispatch(fetchUserSession(token));
    }
  }, [token, refresh]);

  return !isEmpty(userData.data) ? userData.data : false;
};
