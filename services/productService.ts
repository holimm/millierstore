import { ResponseBEType } from "@/models/common";
import { ProductDetailType } from "@/models/productDetailModel";
import { CategoryType } from "@/models/productModel";
import axiosMongo from "@/network/axiosMongo";

const productService = {
  async getAll(): Promise<ResponseBEType<ProductDetailType>> {
    const result = await axiosMongo.get(`/api/products`);
    return result as any;
  },
  async getAllCategory(): Promise<ResponseBEType<CategoryType>> {
    const result = await axiosMongo.get(`/api/category`);
    console.log(result);
    return result as any;
  },
};

export default productService;
