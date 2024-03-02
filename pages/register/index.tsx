import { CustomButton } from "@/components/common";
import { CustomText } from "@/components/homePage/common";
import { generateUUIDToken } from "@/helpers/commonHelpers";
import { RegisterAccountType } from "@/models/userModel";
import {
  createUserAccount,
  sendVerifyEmail,
} from "@/redux/entities/users/asyncThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getUserCreateAccountLoading,
  getUserCreateAccountSendEmailLoading,
} from "@/redux/selectors/user";
import {
  CloseOutlined,
  ExceptionOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Result,
  Row,
  Spin,
  Typography,
} from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const RegisterAccount = () => {
  const dispatch = useAppDispatch();
  const [openSentEmailModal, setOpenSentEmailModal] = useState(false);
  const loadingCreateAccountSendEmail = useAppSelector(
    getUserCreateAccountSendEmailLoading
  );

  useEffect(() => {
    const handleStorage = (event) => {
      setOpenSentEmailModal(true);
    };
    window.addEventListener("open_sent_email_modal", handleStorage);
    return () =>
      window.removeEventListener("open_sent_email_modal", handleStorage);
  }, []);

  const onFinish = async (values: RegisterAccountType) => {
    const { confirm_password, ...data } = values;
    dispatch(sendVerifyEmail(data));
  };
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
              Email Verification Sent
            </CustomText>
          }
          subTitle={
            <CustomText
              type="paragraph"
              extraClass="!text-neutral-500 !text-lg"
            >
              An email verification email has been successfully sent to your
              email address.
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
      <div className="h-fit w-full pt-16 pb-24 bg-gradient-to-r from-zinc-100 to-neutral-100">
        <Flex justify="center" align="center">
          <div className="h-fit w-[50vw] p-10 bg-white shadow-lg rounded-xl">
            <Spin spinning={loadingCreateAccountSendEmail.data}>
              <CustomText
                type="paragraph"
                topClass="text-center"
                extraClass="!text-2xl !text-black !font-semibold"
              >
                CREATE ACCOUNT
              </CustomText>
              <Divider />
              <Form
                name="formRegisterAccount"
                layout="vertical"
                className="w-full mb-10"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item<RegisterAccountType>
                      name="name"
                      label="Fullname"
                      className="mt-2"
                      rules={[
                        {
                          required: true,
                          message: "*Please input your fullname",
                        },
                        {
                          pattern: /^[\p{L}']+(?: [\p{L}']+)+$/u,
                          message: "*Please input valid fullname",
                        },
                      ]}
                    >
                      <Input
                        className="py-3"
                        placeholder="Email"
                        size="middle"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<RegisterAccountType>
                      name="username"
                      label="Username"
                      className="mt-2"
                      rules={[
                        {
                          required: true,
                          message: "*Please input your username",
                        },
                        {
                          min: 5,
                          max: 30,
                          message:
                            "*Username must contain minimum 8 characters, maximum 30 characters",
                        },
                        {
                          pattern: /^[a-zA-Z0-9]{5,30}$/,
                          message: <>*Must be alphanumeric characters</>,
                        },
                      ]}
                    >
                      <Input
                        className="py-3"
                        placeholder="Email"
                        size="middle"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item<RegisterAccountType>
                      name="email"
                      label="Email"
                      className="mt-2"
                      rules={[
                        {
                          required: true,
                          message: "*Please input your email address",
                        },
                        {
                          type: "email",
                          message: "*Please input valid email address",
                        },
                      ]}
                    >
                      <Input
                        className="py-3"
                        placeholder="Email"
                        size="middle"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<RegisterAccountType>
                      name="phone"
                      label="Phone number"
                      className="mt-2"
                      rules={[
                        {
                          required: true,
                          message: "*Please input your phone number",
                        },
                        {
                          pattern: /^\d{10}$/,
                          message: "*Phone number must contains 10 numbers",
                        },
                      ]}
                    >
                      <Input
                        className="py-3"
                        placeholder="Email"
                        size="middle"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item<RegisterAccountType>
                      name="password"
                      label="Password"
                      className="mt-2"
                      rules={[
                        {
                          required: true,
                          message: "*Please input your password",
                        },
                        {
                          pattern:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message: (
                            <>
                              *Password must contain minimum 8 characters
                              <br />
                              *At least one uppercase letter, one lowercase
                              letter, one number and one special character
                            </>
                          ),
                        },
                      ]}
                    >
                      <Input.Password
                        className="py-3"
                        placeholder="Password"
                        size="middle"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item<RegisterAccountType>
                      name="confirm_password"
                      label="Confirm Password"
                      className="mt-2"
                      rules={[
                        {
                          required: true,
                          message: "*Please confirm your password",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "*The two passwords that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        className="py-3"
                        placeholder="Password"
                        size="middle"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item className="mt-10">
                  <CustomButton
                    type="primary"
                    htmlType="submit"
                    extraClass="bg-blue-500"
                    icon={<UserAddOutlined />}
                  >
                    Sign up
                  </CustomButton>
                </Form.Item>
              </Form>
              <Divider plain>Already have an account?</Divider>
              <Row className="mt-8" gutter={16}>
                <Col span={12}>
                  <div
                    onClick={() =>
                      window.dispatchEvent(new Event("open_signin_drawer"))
                    }
                  >
                    <CustomButton
                      htmlType="button"
                      type="default"
                      icon={<UserOutlined />}
                    >
                      Sign In
                    </CustomButton>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <CustomButton type="default" icon={<ExceptionOutlined />}>
                      Forget password?
                    </CustomButton>
                  </div>
                </Col>
              </Row>
            </Spin>
          </div>
        </Flex>
      </div>
    </>
  );
};

export default RegisterAccount;
