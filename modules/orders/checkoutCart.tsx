import { CustomText } from "@/components/homePage/common";
import {
  NumberToDollarFormat,
  calculateCartTotal,
} from "@/helpers/commonHelpers";
import { CartType } from "@/models/cartModel";
import { CheckoutInformationType } from "@/models/orderModel";
import { removeFromCart, updateQuantity } from "@/redux/entities/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCreateOrderLoading } from "@/redux/selectors/orders";
import { Divider, Form, Input, Spin } from "antd";
import { isEmpty } from "lodash";
import { useCallback } from "react";
import { ListCart } from "./listCart";

export const CheckoutCart = ({
  cartList,
}: {
  cartList: { data: CartType[] };
}) => {
  const dispatch = useAppDispatch();
  const loadingCreateOrder = useAppSelector(getCreateOrderLoading);

  const handleRemoveFromCart = useCallback(
    (item: CartType) => {
      dispatch(removeFromCart(item));
    },
    [cartList]
  );

  const handleQuantity = useCallback(
    (item: CartType, quantity: number) => {
      const data = {
        name: item.name,
        storage: item.storage,
        color: item.color,
        quantity: quantity,
      };
      dispatch(updateQuantity(data));
    },
    [cartList]
  );
  return (
    <Spin spinning={loadingCreateOrder.data}>
      <CustomText
        type="paragraph"
        extraClass="!text-black !font-semibold"
        topClass="!text-xl"
      >
        My Cart
      </CustomText>
      <Divider />
      <ListCart
        cartList={cartList.data}
        handleRemoveFromCart={handleRemoveFromCart}
        handleQuantity={handleQuantity}
        showCartFunction
      />
      <Divider />
      <CustomText type="paragraph" extraClass="!text-lg !text-black">
        Total: {NumberToDollarFormat(calculateCartTotal(cartList.data))}
      </CustomText>
      {!isEmpty(cartList) && (
        <Form.Item<CheckoutInformationType>
          name="total"
          rules={[{ required: true }]}
          hidden
        >
          <Input />
        </Form.Item>
      )}
    </Spin>
  );
};
