export interface UserAddressType {
  _id: string;
  index: number;
  type: string;
  phone: string;
  street: string;
  district: string;
  ward: string;
  city: string;
}

export interface UserType {
  username: string;
  password: string;
  email: string;
  name: string;
  phone: string;
  address: UserAddressType[];
  token: string;
  _id: string;
}
