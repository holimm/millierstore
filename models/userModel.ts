export interface UserAddressType {
  _id?: string;
  index?: number;
  type?: string;
  phone?: string;
  street?: string;
  district?: string;
  ward?: string;
  city?: string;
}

export interface UserType {
  username?: string;
  password?: string;
  email?: string;
  name?: string;
  phone?: string;
  address?: UserAddressType[];
  token?: string;
  _id?: string;
  remember?: boolean;
}

export interface RegisterAccountType {
  name?: string;
  username?: string;
  password?: string;
  confirm_password?: string;
  email?: string;
  phone?: string;
  emailVerifyToken?: string;
}

export interface ForgotPasswordAccountType {
  email?: string;
  password?: string;
  confirm_password?: string;
  emailVerifyToken?: string;
}

export interface RegisterAccountAbsoluteType {
  name?: string;
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  emailVerifyToken?: string;
  token?: string;
  address?: any[];
}
