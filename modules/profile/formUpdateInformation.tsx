import { CustomButton } from "@/components/common";
import { CustomText } from "@/components/homePage/common";
import {
  confirmPasswordConstraint,
  fullnameConstraint,
  passwordConstraint,
  phoneConstraint,
  usernameConstraint,
} from "@/helpers/constraint/userDataContraint";
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
import { isEmpty } from "lodash";
import { useEffect } from "react";

export const FormUpdateInformation = ({
  authenAccount,
}: {
  authenAccount: UserType;
}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const loadingChangingInformation = useAppSelector(
    getUserChangingInformationLoading
  );

  useEffect(() => {
    isEmpty(authenAccount) && form.resetFields();
  }, [authenAccount]);

  const onFinishUpdateInformation = async (
    values: FieldProfileInformationType
  ) => {
    dispatch(updateUserInformation({ _id: authenAccount._id, ...values }));
  };

  return (
    <>
      {isEmpty(authenAccount.username && authenAccount.password) && (
        <div
          className="h-20 w-full my-5 rounded-md shadow bg-yellow-300"
          style={{
            backgroundColor: "rgb(253 224 71 / var(--tw-bg-opacity))",
            padding: `0.75em 0.75em 0.75em 0.75em`,
          }}
        >
          <p className="font-sf_pro_text">
            Please update your profile information to complete your profile.
          </p>
        </div>
      )}
      <Spin spinning={loadingChangingInformation.data}>
        <Form
          form={form}
          name="formUpdateInformation"
          layout="vertical"
          className="w-full mb-10"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{
            name: authenAccount.name,
            phone: authenAccount.phone,
          }}
          onFinish={onFinishUpdateInformation}
          autoComplete="off"
          disabled={loadingChangingInformation.data}
        >
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
                name="phone"
                label="Phone number"
                rules={phoneConstraint}
              >
                <Input
                  className="py-3"
                  placeholder="Phone number"
                  size="middle"
                />
              </Form.Item>
            </Col>
            {isEmpty(authenAccount.username && authenAccount.password) && (
              <Col span={12}>
                <Form.Item<FieldProfileInformationType>
                  name="username"
                  label="Username"
                  rules={usernameConstraint}
                >
                  <Input
                    className="py-3"
                    placeholder="Username"
                    size="middle"
                  />
                </Form.Item>
              </Col>
            )}
          </Row>
          {isEmpty(authenAccount.username && authenAccount.password) && (
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item<FieldProfileInformationType>
                  name="password"
                  label="Password"
                  rules={passwordConstraint}
                >
                  <Input.Password
                    className="py-3"
                    placeholder="Password"
                    size="middle"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldProfileInformationType>
                  name="password_confirm"
                  label="Confirm Password"
                  rules={confirmPasswordConstraint}
                >
                  <Input.Password
                    className="py-3"
                    placeholder="Confirm Password"
                    size="middle"
                  />
                </Form.Item>
              </Col>
            </Row>
          )}
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
    </>
  );
};
