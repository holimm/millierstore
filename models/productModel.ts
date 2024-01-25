export interface ProductsType {
  _id?: string;
  name?: string;
  description?: string;
  lowest_price?: number;
  image?: string;
  category?: string;
}

export interface CategoryType {
  _id?: string;
  name?: string;
  image?: string;
}
