import {
  ProductColorType,
  ProductMemoryType,
  ProductStorageType,
} from "./productDetailModel";

export interface CartType {
  name?: string;
  storage?: ProductStorageType;
  memory?: ProductMemoryType;
  price?: number;
  color?: ProductColorType;
  quantity?: number;
}
