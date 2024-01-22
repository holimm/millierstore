export interface ProductDetailType {
  _id?: string;
  name?: string;
  name_lower?: string;
  description?: string;
  colors?: {
    label: string;
    lowercase: string;
  }[];
  storage?: {
    capacity: number;
    unit: string;
    price: number;
  }[];
}
