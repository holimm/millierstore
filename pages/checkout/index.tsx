import { Col, Form, Row } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { calculateCartTotal } from "@/helpers/commonHelpers";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCart } from "@/redux/selectors/cart";
import { useCart } from "@/hooks/useCart";
import { FormCheckout } from "@/modules/orders/formCheckout";
import { useAuthen } from "@/hooks/useAuthen";
import { CheckoutCart } from "@/modules/orders/checkoutCart";
import { CheckoutInformationType } from "@/models/orderModel";
import { getCreateOrderLoading } from "@/redux/selectors/orders";
import { createOrder } from "@/redux/entities/orders/asyncThunk";
import dayjs from "dayjs";

export default function Home() {
  const dispatch = useAppDispatch();
  const authenAccount = useAuthen();
  const cartSession = useCart();
  const cartList = useAppSelector(getCart);
  const [form] = Form.useForm();
  const [currentAddressTab, setCurrentAddressTab] = useState<string>("existed");
  const [currentPaymentTab, setCurrentPaymentTab] = useState<string>("cod");
  const createOrderLoading = useAppSelector(getCreateOrderLoading);

  // console.log(dayjs("2024-02-28T22:56:43+07:00").format("DD/MM/YYYY HH:mm:ss"));

  const onFinishCheckout = async ({
    name,
    method,
    total,
    note,
    ...address
  }: CheckoutInformationType) => {
    const addressData: any = address;
    const data: CheckoutInformationType = {
      accountID:
        authenAccount && !isEmpty(authenAccount) ? authenAccount._id : null,
      name: name,
      method: method,
      address: addressData,
      product: cartList,
      total: total,
      date: [
        {
          id: "dateOrder",
          dateString: dayjs().format(),
        },
      ],
      note: note,
    };
    // console.log(data);
    dispatch(createOrder(data));
    // dispatch(updateUserInformation({ _id: authenAccount._id, ...values }));
  };

  useEffect(() => {
    form.setFieldValue("name", authenAccount ? authenAccount.name : "");
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
                <CheckoutCart cartList={cartList} />
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </main>
  );
}
