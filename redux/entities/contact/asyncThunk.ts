import { createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "@/services/contact";
import { ContactFormType } from "@/models/contactModel";
import { isEmpty, parseInt } from "lodash";
import { notificationMessage } from "@/helpers/commonHelpers";

export const storeName = "productsSlice";

export const createContactNode = createAsyncThunk(
  `${storeName}/createContactNode`,
  async (values: ContactFormType) => {
    let resp;
    if (!isEmpty(localStorage.getItem("contact_form_sent"))) {
      if (parseInt(localStorage.getItem("contact_form_sent")) < 2) {
        localStorage.setItem(
          "contact_form_sent",
          (parseInt(localStorage.getItem("contact_form_sent")) + 1).toString()
        );
        resp = await contactService.createContactNode(values);
      } else {
        resp = { status: "error", data: "You can only submit 2 forms" };
      }
    } else {
      localStorage.setItem("contact_form_sent", "1");
    }
    if (resp.status === "error") throw resp.data;
    return resp.data;
  }
);
