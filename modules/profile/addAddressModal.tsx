import { CustomButton } from "@/components/common";
import { phoneConstraint } from "@/helpers/constraint/userDataContraint";
import { UserAddressType, UserType } from "@/models/userModel";
import { createUserAddress } from "@/redux/entities/users/asyncThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserCreateAddressLoading } from "@/redux/selectors/user";
import { Col, Divider, Form, Input, Modal, Row, Select, Spin } from "antd";
import { isEmpty } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";

export const AddAddressModal = ({
  authenAccount,
  openAddAddressModal,
  setOpenAddAddressModal,
}: {
  authenAccount: UserType;
  openAddAddressModal: boolean;
  setOpenAddAddressModal: any;
}) => {
  const dispatch = useAppDispatch();
  const loadingCreateAddress = useAppSelector(getUserCreateAddressLoading);
  const onFinishAddAddress = async (values: UserAddressType) => {
    // console.log(values);
    dispatch(createUserAddress({ _id: authenAccount._id, ...values }));
  };
  return (
    <Modal
      title="Add new address  "
      centered
      open={openAddAddressModal}
      onOk={() => setOpenAddAddressModal(false)}
      onCancel={() => setOpenAddAddressModal(false)}
      footer={false}
    >
      <Spin spinning={loadingCreateAddress.data}>
        <Divider />
        <Form
          name="basic"
          layout="vertical"
          className="w-full mb-10"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinishAddAddress}
          autoComplete="off"
        >
          <AddressFormItem isProfile />
        </Form>
      </Spin>
    </Modal>
  );
};

export const AddressFormItem = ({
  isProfile,
  isHidden,
  onFormFieldChange,
}: {
  isProfile?: boolean;
  isHidden?: boolean;
  onFormFieldChange?: (value: string) => void;
}) => {
  return (
    <Row gutter={20} hidden={isHidden}>
      <Col span={12}>
        <Form.Item<UserAddressType>
          name="type"
          label="Type"
          rules={[
            { required: true, message: "Please input your address type!" },
          ]}
        >
          <Select
            style={{ height: "47px" }}
            size="middle"
            defaultValue={"Home"}
          >
            <Select.Option value="Home">Home</Select.Option>
            <Select.Option value="Office">Office</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item<UserAddressType>
          name="city"
          label="City"
          rules={[{ required: true, message: "Please input your city!" }]}
        >
          <Input className="py-3" placeholder="City" size="middle" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item<UserAddressType>
          name="district"
          label="District"
          rules={[{ required: true, message: "Please input your dictrict!" }]}
        >
          <Input className="py-3" placeholder="District" size="middle" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item<UserAddressType>
          name="ward"
          label="Ward"
          rules={[{ required: true, message: "Please input your ward!" }]}
        >
          <Input className="py-3" placeholder="Ward" size="middle" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item<UserAddressType>
          name="street"
          label="Street"
          rules={[{ required: true, message: "Please input your street!" }]}
        >
          <Input className="py-3" placeholder="Street" size="middle" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item<UserAddressType>
          name="phone"
          label="Phone"
          rules={phoneConstraint}
        >
          <Input className="py-3" placeholder="Phone number" size="middle" />
        </Form.Item>
      </Col>
      {isProfile && (
        <Col span={12}>
          <Form.Item>
            <CustomButton
              type="primary"
              htmlType="submit"
              extraClass="!w-[10em] bg-blue-500 mt-4"
            >
              Create
            </CustomButton>
          </Form.Item>
        </Col>
      )}
    </Row>
  );
};
