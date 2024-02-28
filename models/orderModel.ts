import { CartType } from "./cartModel";

export interface CheckoutInformationType {
  _id?: string;
  accountID: string;
  name?: string;
  method?: string;
  address?: CheckoutFormAddressType;
  product?: CartType[];
  total?: number;
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
  id?: "dateOrder" | "dateDelivered";
  dateString?: string;
}
