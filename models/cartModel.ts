import { ProductColorType, ProductStorageType } from "./productDetailModel";

export interface CartType {
  name?: string;
  storage?: ProductStorageType;
  color?: ProductColorType;
}
