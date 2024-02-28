import { CheckoutInformationType } from "@/models/orderModel";
import { ResponseBEType } from "@/models/common";
import axiosMongo from "@/network/axiosMongo";

const orderService = {
  async createOrder(values): Promise<ResponseBEType<CheckoutInformationType>> {
    const result = await axiosMongo.post(`/api/orders/create`, values);
    return result as any;
  },
  async fetchOrdersByAccountId(
    accountID: string
  ): Promise<ResponseBEType<CheckoutInformationType[]>> {
    const result = await axiosMongo.get(
      `/api/orders/getOrdersByAccountId/${accountID}`
    );
    return result as any;
  },
};

export default orderService;
