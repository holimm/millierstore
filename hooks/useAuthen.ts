import { UserType } from "@/models/userModel";
import axiosMongo from "@/network/axiosMongo";
import { saveUser } from "@/redux/entities/users";
import { fetchUserSession } from "@/redux/entities/users/asyncThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/selectors/user";
import userService from "@/services/userService";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";

export const useAuthen = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUser);
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
    const handleStorage = (event) => {
      setRefresh(!refresh);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refresh]);

  useEffect(() => {
    if (!isEmpty(localStorage.getItem("signin_token"))) {
      dispatch(fetchUserSession(localStorage.getItem("signin_token")));
    } else {
      dispatch(saveUser({}));
    }
  }, [refresh]);

  return !isEmpty(userData.data) ? userData.data : false;
};
