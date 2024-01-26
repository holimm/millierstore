import { ResponseBEType } from "@/models/common";
import { ProductDetailType } from "@/models/productDetailModel";
import { CategoryType } from "@/models/productModel";
import axiosMongo from "@/network/axiosMongo";

const productService = {
  async getAll(args: {
    params?: { name: string };
  }): Promise<ResponseBEType<ProductDetailType>> {
    const result = await axiosMongo.get(`/api/products`, args);
    return result as any;
  },
  async getAllSearch(args: {
    params?: { name: string };
  }): Promise<ResponseBEType<ProductDetailType>> {
    const result = await axiosMongo.get(`/api/products`, args);
    return result as any;
  },
  async getAllCategory(): Promise<ResponseBEType<CategoryType>> {
    const result = await axiosMongo.get(`/api/category`);
    return result as any;
  },
};

export default productService;
