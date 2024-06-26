import { CustomButton } from "@/components/common";
import { CustomText } from "@/components/homePage/common";
import { FieldProfileInformationType } from "@/models/common";
import { UserType } from "@/models/userModel";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Card,
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Spin,
} from "antd";
import { isEmpty } from "lodash";
import { AddressFormItem } from "../profile/addAddressModal";
import { renderText } from "../profile/addressRender";
import { ReactNode, useState } from "react";
import {
  CheckoutFormAddressType,
  CheckoutInformationType,
} from "@/models/orderModel";
import { getCreateOrderLoading } from "@/redux/selectors/orders";
import {
  emailConstraint,
  fullnameConstraint,
} from "@/helpers/constraint/userDataContraint";

const ExistedAddressForm = ({
  authenAccount,
  onChangeExistedAddress,
}: {
  authenAccount: UserType;
  onChangeExistedAddress: any;
}) => {
  const [currentAddress, setCurrentAddress] = useState<number>();
  const handleAddressChange = (address: CheckoutFormAddressType) => {
    onChangeExistedAddress(address);
  };
  return (
    <>
      {!isEmpty(authenAccount.address) && (
        <div className="grid grid-cols-3 gap-5 my-8">
          {authenAccount.address.map(
            (item: CheckoutFormAddressType, key: number) => (
              <div
                key={key}
                className={`p-5 rounded-lg cursor-pointer border-[1px] transition-all duration-500 ${
                  currentAddress === key && "shadow-lg"
                }`}
                onClick={() => {
                  setCurrentAddress(key);
                  handleAddressChange(item);
                }}
              >
                <span className="text-2xl font-bold">
                  {renderText(`${item.type}`)}
                </span>
                <Divider />
                {renderText(`Street: ${item.street}`)}
                {renderText(`Ward: ${item.ward}`)}
                {renderText(`District: ${item.district}`)}
                {renderText(`City: ${item.city}`)}
                {renderText(`Phone: ${item.phone}`)}
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

const PaymentTabBox = ({ children }: { children: ReactNode }) => {
  return <Card className="my-10 border-1 border-neutral-700">{children}</Card>;
};

export const FormCheckout = ({
  formHook,
  authenAccount,
  currentAddressTab,
  currentPaymentTab,
  setCurrentAddressTab,
  setCurrentPaymentTab,
}: {
  formHook: FormInstance<any>;
  authenAccount: UserType;
  currentAddressTab: string;
  currentPaymentTab: string;
  setCurrentAddressTab: any;
  setCurrentPaymentTab: any;
}) => {
  const dispatch = useAppDispatch();
  const loadingCreateOrder = useAppSelector(getCreateOrderLoading);

  const onChangeExistedAddress = async (values: CheckoutFormAddressType) => {
    formHook.setFieldValue("type", values.type);
    formHook.setFieldValue("street", values.street);
    formHook.setFieldValue("ward", values.ward);
    formHook.setFieldValue("district", values.district);
    formHook.setFieldValue("city", values.city);
    formHook.setFieldValue("phone", values.phone);
  };

  const onChangeAddressTab = (e: RadioChangeEvent) => {
    setCurrentAddressTab(e.target.value);
    formHook.resetFields([
      "type",
      "street",
      "ward",
      "district",
      "city",
      "phone",
    ]);
  };

  const onChangePaymentTab = (e: RadioChangeEvent) => {
    setCurrentPaymentTab(e.target.value);
    formHook.setFieldValue("method", e.target.value);
  };

  return (
    <Spin spinning={loadingCreateOrder.data}>
      <CustomText
        type="paragraph"
        extraClass="!text-black !font-semibold"
        topClass="!text-xl"
      >
        Contact Information
      </CustomText>
      <Divider />
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item<FieldProfileInformationType>
            name="name"
            label="Name"
            rules={fullnameConstraint}
          >
            <Input className="py-3" placeholder="Full name" size="middle" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<FieldProfileInformationType>
            name="email"
            label="Email"
            rules={emailConstraint}
          >
            <Input
              className="py-3"
              placeholder="Email"
              size="middle"
              disabled={isEmpty(authenAccount) ? false : true}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <CustomText
            type="paragraph"
            extraClass="!text-black !text-neutral-500"
          >
            *We will send you an email to track your order. If not please check
            your spam box.
          </CustomText>
        </Col>
      </Row>
      <CustomText
        type="paragraph"
        extraClass="!text-black !font-semibold"
        topClass="!text-xl !mt-3"
      >
        Delivery Information
      </CustomText>
      <Divider />
      {isEmpty(authenAccount) || isEmpty(authenAccount.address) ? (
        <AddressFormItem />
      ) : (
        <>
          <Radio.Group
            className="flex justify-start"
            size="large"
            value={currentAddressTab}
            onChange={onChangeAddressTab}
            style={{ marginBottom: 16 }}
          >
            <Radio.Button value="existed">Existed Address</Radio.Button>
            <Radio.Button value="new">New Address</Radio.Button>
          </Radio.Group>
          {currentAddressTab === "existed" ? (
            <AddressFormItem isHidden />
          ) : (
            <AddressFormItem />
          )}
          {currentAddressTab === "existed" && (
            <>
              <AddressFormItem isHidden />
              <ExistedAddressForm
                authenAccount={authenAccount}
                onChangeExistedAddress={onChangeExistedAddress}
              />
            </>
          )}
        </>
      )}
      <CustomText
        type="paragraph"
        extraClass="!text-black !font-semibold"
        topClass="!text-xl !mt-5"
      >
        Choose payment method
      </CustomText>
      <Divider />
      <Radio.Group
        className="flex justify-start"
        size="large"
        value={currentPaymentTab}
        onChange={onChangePaymentTab}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value="cod">Cash on Delivery</Radio.Button>
        <Radio.Button value="credit-card">Credit Card</Radio.Button>
      </Radio.Group>
      <Form.Item<CheckoutInformationType>
        name="method"
        rules={[{ required: true }]}
        hidden
      >
        <Input />
      </Form.Item>
      {currentPaymentTab === "cod" && (
        <PaymentTabBox>
          <CustomText type="paragraph" extraClass="!text-lg !text-black">
            Payment is made on delivery
          </CustomText>
        </PaymentTabBox>
      )}
      {currentPaymentTab === "credit-card" && (
        <PaymentTabBox>
          <CustomText type="paragraph" extraClass="!text-lg !text-black">
            <span className="font-semibold">Credit Card Number:</span> 1234 5678
            9012 3456
            <br /> <span className="font-semibold">Cardholder Name:</span> John
            Doe
            <br />
            <span className="font-semibold">Billing Address:</span> 123 Main
            Street, Cityville, ST 12345, USA
          </CustomText>
        </PaymentTabBox>
      )}
      <CustomText
        type="paragraph"
        extraClass="!text-black !font-semibold"
        topClass="!text-xl"
      >
        Note
      </CustomText>
      <Divider />
      <Form.Item<CheckoutInformationType>
        name="note"
        rules={[{ required: false }]}
      >
        <Input.TextArea
          className="p-5"
          placeholder="Write your note here"
          autoSize={{ minRows: 3, maxRows: 6 }}
          maxLength={100}
          showCount
        />
      </Form.Item>

      <Form.Item className="w-fit mt-10">
        <CustomButton
          type="primary"
          htmlType="submit"
          extraClass="bg-blue-500 px-10"
        >
          Place Order
        </CustomButton>
      </Form.Item>
    </Spin>
  );
};
