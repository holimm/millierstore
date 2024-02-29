import { CartType } from "./cartModel";

export interface CheckoutInformationType {
  _id?: string;
  accountID: string;
  name?: string;
  method?: string;
  address?: CheckoutFormAddressType;
  product?: CartType[];
  total?: number;
  status?: string;
  date?: OrderDateType[];
  note: string;
}

export interface CheckoutFormAddressType {
  type?: string;
  phone?: string;
  street?: string;
  district?: string;
  ward?: string;
  city?: string;
}

export interface OrderDateType {
  id?: "dateOrder" | "dateDelivering" | "dateDelivered" | "dateCancelled";
  dateString?: string;
}
