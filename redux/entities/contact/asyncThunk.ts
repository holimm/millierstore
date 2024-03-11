import { createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "@/services/contact";
import { ContactFormType } from "@/models/contactModel";
import { isEmpty, parseInt } from "lodash";
import { notificationMessage } from "@/helpers/commonHelpers";

export const storeName = "contactsSlice";

export const createContactNode = createAsyncThunk(
  `${storeName}/createContactNode`,
  async (values: ContactFormType) => {
    const resp = await contactService.createContactNode(values);
    if (resp.status === "error") throw resp.data;
    return resp;
  }
);
