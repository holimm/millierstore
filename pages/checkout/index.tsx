import { Button, Col, Form, Modal, Result, Row } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import {
  calculateCartTotal,
  notificationMessage,
} from "@/helpers/commonHelpers";
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
import { CustomText } from "@/components/homePage/common";
import { CloseOutlined } from "@ant-design/icons";

export default function Home() {
  const dispatch = useAppDispatch();
  const authenAccount = useAuthen();
  const cartSession = useCart();
  const cartList = useAppSelector(getCart);
  const [form] = Form.useForm();
  const [currentAddressTab, setCurrentAddressTab] = useState<string>("existed");
  const [currentPaymentTab, setCurrentPaymentTab] = useState<string>("cod");
  const [openSentEmailModal, setOpenSentEmailModal] = useState(false);

  useEffect(() => {
    const handleStorage = (event) => {
      setOpenSentEmailModal(true);
    };
    window.addEventListener("open_order_success_modal", handleStorage);
    return () =>
      window.removeEventListener("open_order_success_modal", handleStorage);
  }, []);

  const onFinishCheckout = async ({
    name,
    email,
    method,
    total,
    note,
    ...address
  }: CheckoutInformationType) => {
    if (!isEmpty(cartList.data)) {
      const addressData: any = address;
      const data: CheckoutInformationType = {
        accountID:
          authenAccount && !isEmpty(authenAccount) ? authenAccount._id : null,
        name: name,
        email: email,
        method: method,
        address: addressData,
        product: cartList.data,
        total: total,
        date: [
          {
            id: "dateOrder",
            dateString: dayjs().format(),
          },
        ],
        status: "Pending",
        note: note,
      };
      dispatch(createOrder(data));
    } else {
      notificationMessage({ type: "error", content: "Your cart is empty" });
    }
  };

  useEffect(() => {
    form.setFieldValue("name", authenAccount ? authenAccount.name : "");
    form.setFieldValue("email", authenAccount ? authenAccount.email : "");
  }, [authenAccount]);

  useEffect(() => {
    form.setFieldValue("total", calculateCartTotal(cartList.data));
  }, [cartList]);

  return (
    <>
      <Modal
        width={"50vw"}
        open={openSentEmailModal}
        cancelButtonProps={{ className: "hidden" }}
        onCancel={() => setOpenSentEmailModal(false)}
        centered
      >
        <Result
          status="success"
          title={
            <CustomText
              type="paragraph"
              extraClass="!text-black !text-3xl !font-semibold"
            >
              Order placed successfully
            </CustomText>
          }
          subTitle={
            <CustomText
              type="paragraph"
              extraClass="!text-neutral-500 !text-lg"
            >
              You have successfully placed your order!
            </CustomText>
          }
          extra={[
            <Button
              icon={<CloseOutlined />}
              onClick={() => setOpenSentEmailModal(false)}
              size="middle"
              key="buy"
            >
              Close
            </Button>,
          ]}
        />
      </Modal>
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
                email: "",
                method: "cod",
                type: "Home",
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
    </>
  );
}
