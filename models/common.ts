export interface ResponseBEType<T> {
  status?: string;
  data?: T;
}

export interface ProductCardType {
  code?: string;
  name?: string;
  description?: string;
  price?: string | any;
  srcImage?: string;
}

export interface FieldProfileInformationType {
  _id?: string;
  username?: string;
  name?: string;
  phone?: string;
  password?: string;
  password_confirm?: string;
}

export interface FieldProfilePasswordType {
  _id?: string;
  old_password?: string;
  password?: string;
  password_confirm?: string;
}
