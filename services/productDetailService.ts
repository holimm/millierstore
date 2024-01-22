import { ResponseBEType } from "@/models/common";
import { ProductDetailType } from "@/models/productDetailModel";
import axiosMongo from "@/network/axiosMongo";

const productDetailService = {
  async getOne(code: string): Promise<ResponseBEType<ProductDetailType>> {
    const result = await axiosMongo.get(`/api/productsdetail/${code}`);
    return result as any;
  },
};

export default productDetailService;
