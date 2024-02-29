import { CustomButton } from "@/components/common";
import {
  FieldProfileInformationType,
  FieldProfilePasswordType,
} from "@/models/common";
import { UserType } from "@/models/userModel";
import {
  updateUserInformation,
  updateUserPassword,
} from "@/redux/entities/users/asyncThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getUserChangingInformationLoading,
  getUserChangingPasswordLoading,
} from "@/redux/selectors/user";
import { Col, Form, Input, Row, Spin } from "antd";

export const FormUpdateInformation = ({
  authenAccount,
}: {
  authenAccount: UserType;
}) => {
  const dispatch = useAppDispatch();
  const loadingChangingInformation = useAppSelector(
    getUserChangingInformationLoading
  );
  const onFinishUpdateInformation = async (
    values: FieldProfileInformationType
  ) => {
    dispatch(updateUserInformation({ _id: authenAccount._id, ...values }));
  };
  return (
    <Spin spinning={loadingChangingInformation.data}>
      <Form
        name="basic"
        layout="vertical"
        className="w-full mb-10"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinishUpdateInformation}
        autoComplete="off"
        disabled={loadingChangingInformation.data}
      >
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item<FieldProfileInformationType>
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
              initialValue={authenAccount.name}
            >
              <Input className="py-3" placeholder="Full name" size="middle" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldProfileInformationType>
              name="phone"
              label="Phone number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
              initialValue={authenAccount.phone}
            >
              <Input
                className="py-3"
                placeholder="Phone number"
                size="middle"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="w-fit mt-5">
          <CustomButton
            type="primary"
            htmlType="submit"
            extraClass="bg-blue-500 px-10"
          >
            Update Information
          </CustomButton>
        </Form.Item>
      </Form>
    </Spin>
  );
};
