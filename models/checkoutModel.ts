export interface CheckoutInformationType {
  name?: string;
  method?: string;
  address?: CheckoutFormAddressType;
  total?: number;
}

export interface CheckoutFormAddressType {
  type: string;
  phone: string;
  street: string;
  district: string;
  ward: string;
  city: string;
}
