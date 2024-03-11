import { CheckoutInformationType } from "@/models/orderModel";
import { ResponseBEType } from "@/models/common";
import axiosMongo from "@/network/axiosMongo";

const orderService = {
  async fetchOrderByCode(args: {
    params: { code: string; email: string };
  }): Promise<ResponseBEType<CheckoutInformationType>> {
    const query = args.params;
    const result = await axiosMongo.get(
      `/api/orders/getTrackingOrder/${query.code}/${query.email}`
    );
    return result as any;
  },
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
  async cancelOrderById(id: string): Promise<ResponseBEType<string>> {
    try {
      const result = await axiosMongo.put(`/api/orders/cancelOrder/${id}`, {
        idOrder: id,
      });
      return result.data as any;
    } catch (err) {
      return err as any;
    }
  },
};

export default orderService;
