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

export interface GoogleLoginCodeResponseType {
  access_token?: string;
  authuser?: string;
  expires_in?: number;
  prompt?: string;
  scope?: string;
  token_type?: string;
}

export interface GoogleProfileType {
  email?: string;
  family_name?: string;
  given_name?: string;
  id?: string;
  locale?: string;
  name?: string;
  picture?: string;
  verified_email?: boolean;
}
