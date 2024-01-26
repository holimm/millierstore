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
