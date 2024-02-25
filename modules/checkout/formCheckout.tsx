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
  Radio,
  RadioChangeEvent,
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
  const [addressValue, setAddressValue] =
    useState<CheckoutFormAddressType | null>();
  const [currentAddressTab, setCurrentAddressTab] = useState<string>("existed");

  const onFinishCheckout = async (values: FieldProfileInformationType) => {
    console.log(
      !isEmpty(addressValue) && currentAddressTab === "existed"
        ? { ...addressValue, ...values }
        : values
    );
    // dispatch(updateUserInformation({ _id: authenAccount._id, ...values }));
  };
  const onChangeExistedAddress = async (values: CheckoutFormAddressType) => {
    setAddressValue(values);
    // dispatch(updateUserInformation({ _id: authenAccount._id, ...values }));
  };

  const onChangeAddressTab = (e: RadioChangeEvent) => {
    setCurrentAddressTab(e.target.value);
    setAddressValue(null);
  };

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
              initialValue={isEmpty(authenAccount) ? "" : authenAccount.name}
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
        <Divider />
        {isEmpty(authenAccount) ? (
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
            {currentAddressTab === "existed" && (
              <ExistedAddressForm
                authenAccount={authenAccount}
                onChangeExistedAddress={onChangeExistedAddress}
              />
            )}
            {currentAddressTab === "new" && <AddressFormItem />}
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
