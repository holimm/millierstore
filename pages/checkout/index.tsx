import {
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Form,
  Image,
  InputNumber,
  List,
  Row,
  Spin,
  Typography,
} from "antd";
import { isEmpty, omit } from "lodash";
import { CustomText } from "@/components/homePage/common";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  NumberToDollarFormat,
  calculateCartTotal,
} from "@/helpers/commonHelpers";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCategory, fetchProducts } from "@/redux/entities/products";
import {
  getCategory,
  getProducts,
  getProductsLoading,
} from "@/redux/selectors/products";
import { CategoryType, ProductsType } from "@/models/productModel";
import { DescriptionItem, RenderProductCard } from "@/components/common";
import { CategoryProducts } from "@/components/products/categoryProducts";
import { getCart } from "@/redux/selectors/cart";
import { CartType } from "@/models/cartModel";
import { removeFromCart, updateQuantity } from "@/redux/entities/cart";
import { DeleteOutlined } from "@ant-design/icons";
import { useCart } from "@/hooks/useCart";
import { FormCheckout } from "@/modules/checkout/formCheckout";
import { useAuthen } from "@/hooks/useAuthen";
import { ListCart } from "@/modules/checkout/listCart";
import {
  CheckoutFormAddressType,
  CheckoutInformationType,
} from "@/models/checkoutModel";
import { FieldProfileInformationType } from "@/models/common";
import { getCreateOrderLoading } from "@/redux/selectors/order";
import { createOrder } from "@/redux/entities/orders/asyncThunk";

export default function Home() {
  const dispatch = useAppDispatch();
  const authenAccount = useAuthen();
  const cartSession = useCart();
  const cartList = useAppSelector(getCart);
  const [form] = Form.useForm();
  const [currentAddressTab, setCurrentAddressTab] = useState<string>("existed");
  const [currentPaymentTab, setCurrentPaymentTab] = useState<string>("cod");
  const createOrderLoading = useAppSelector(getCreateOrderLoading);
  console.log(cartList);
  const onFinishCheckout = async ({
    name,
    method,
    total,
    ...address
  }: CheckoutInformationType) => {
    const addressData: any = address;
    const data: CheckoutInformationType = {
      name: name,
      method: method,
      address: addressData,
      total: total,
    };
    console.log(data);
    dispatch(createOrder(data));
    // dispatch(updateUserInformation({ _id: authenAccount._id, ...values }));
  };

  useEffect(() => {
    form.setFieldValue("name", authenAccount.name);
  }, [authenAccount]);

  useEffect(() => {
    form.setFieldValue("total", calculateCartTotal(cartList));
  }, [cartList]);

  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full">
        <div className="h-fit w-3/4 mx-auto py-20">
          <Form
            form={form}
            name="basic"
            layout="vertical"
            className="w-full mb-10"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinishCheckout}
            autoComplete="off"
            initialValues={{
              name: "",
              method: "cod",
              type: "",
              street: "",
              ward: "",
              district: "",
              city: "",
              phone: "",
              total: 0,
            }}
          >
            <Row gutter={20}>
              <Col span={16}>
                <FormCheckout
                  formHook={form}
                  authenAccount={authenAccount && authenAccount}
                  currentAddressTab={currentAddressTab}
                  currentPaymentTab={currentPaymentTab}
                  setCurrentAddressTab={setCurrentAddressTab}
                  setCurrentPaymentTab={setCurrentPaymentTab}
                />
              </Col>
              <Col span={8}>
                <ListCart cartList={cartList} />
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </main>
  );
}
