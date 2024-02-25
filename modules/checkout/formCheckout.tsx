import { CustomButton } from "@/components/common";
import { CustomText } from "@/components/homePage/common";
import {
  FieldProfileInformationType,
  FieldProfilePasswordType,
} from "@/models/common";
import {
  CheckoutFormAddressType,
  UserAddressType,
  UserType,
} from "@/models/userModel";
import {
  updateUserInformation,
  updateUserPassword,
} from "@/redux/entities/users/asyncThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserChangingPasswordLoading } from "@/redux/selectors/user";
import {
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Spin,
  Tabs,
  TabsProps,
} from "antd";
import { isEmpty } from "lodash";
import { AddressFormItem } from "../profile/addAddressModal";
import { renderText } from "../profile/addressRender";
import { useState } from "react";

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
      <Form.Item name="type">
        <Input />
      </Form.Item>
      <Form.Item name="street">
        <Input />
      </Form.Item>
      <Form.Item name="ward">
        <Input />
      </Form.Item>
      <Form.Item name="district">
        <Input />
      </Form.Item>
      <Form.Item name="city">
        <Input />
      </Form.Item>
      <Form.Item name="phone">
        <Input />
      </Form.Item>
      {!isEmpty(authenAccount.address) && (
        <div className="grid grid-cols-3 gap-5">
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

export const FormCheckout = ({
  authenAccount,
}: {
  authenAccount: UserType;
}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const loadingChangingInformation = useAppSelector(
    getUserChangingPasswordLoading
  );
  const [addressValue, setAddressValue] = useState<CheckoutFormAddressType>();
  const onFinishCheckout = async (values: FieldProfileInformationType) => {
    console.log(values);
    // dispatch(updateUserInformation({ _id: authenAccount._id, ...values }));
  };
  const onChangeExistedAddress = async (values: CheckoutFormAddressType) => {
    setAddressValue(values);
    // dispatch(updateUserInformation({ _id: authenAccount._id, ...values }));
  };

  const addressTabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Existed Address",
      children: (
        <ExistedAddressForm
          authenAccount={authenAccount}
          onChangeExistedAddress={onChangeExistedAddress}
        />
      ),
    },
    {
      key: "2",
      label: "New Address",
      children: <AddressFormItem />,
    },
  ];

  return (
    <Spin spinning={false}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        className="w-full mb-10"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinishCheckout}
        autoComplete="off"
        disabled={loadingChangingInformation}
        initialValues={{
          name: isEmpty(authenAccount) ? "" : authenAccount.name,
          type: isEmpty(addressValue) ? "" : addressValue.type,
          street: isEmpty(addressValue) ? "" : addressValue.street,
          ward: isEmpty(addressValue) ? "" : addressValue.ward,
          district: isEmpty(addressValue) ? "" : addressValue.district,
          city: isEmpty(addressValue) ? "" : addressValue.city,
          phone: isEmpty(addressValue) ? "" : addressValue.phone,
        }}
      >
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
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
              initialValue={(value) => value}
            >
              <Input className="py-3" placeholder="Full name" size="middle" />
            </Form.Item>
          </Col>
        </Row>
        <CustomText
          type="paragraph"
          extraClass="!text-black !font-semibold"
          topClass="!text-xl"
        >
          Deliver Information
        </CustomText>
        {isEmpty(authenAccount) ? (
          <AddressFormItem />
        ) : (
          <>
            <Tabs items={addressTabItems} />
          </>
        )}
        <Form.Item className="w-fit mt-5">
          <CustomButton
            type="primary"
            htmlType="submit"
            extraClass="bg-blue-500 px-10"
          >
            Checkout
          </CustomButton>
        </Form.Item>
      </Form>
    </Spin>
  );
};
