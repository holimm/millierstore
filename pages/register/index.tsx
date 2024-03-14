import { CustomButton } from "@/components/common";
import { CustomText } from "@/components/homePage/common";
import {
  confirmPasswordConstraint,
  emailConstraint,
  fullnameConstraint,
  passwordConstraint,
  phoneConstraint,
  usernameConstraint,
} from "@/helpers/constraint/userDataContraint";
import { RegisterAccountType } from "@/models/userModel";
import { createUserAccount } from "@/redux/entities/users/asyncThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserCreateAccountSendEmailLoading } from "@/redux/selectors/user";
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
    dispatch(createUserAccount(data));
  };
  return (
    <>
      <Modal
        width={"fit-content"}
        open={openSentEmailModal}
        cancelButtonProps={{ className: "hidden" }}
        onCancel={() => setOpenSentEmailModal(false)}
        centered
      >
        <div className="w-11/12 mx-auto lg:w-[50vw]">
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
        </div>
      </Modal>
      <div className="h-fit w-full pt-16 pb-24 bg-gradient-to-r from-zinc-100 to-neutral-100">
        <Flex justify="center" align="center">
          <div className="h-fit w-11/12 lg:w-[50%] px-5 py-10 lg:px-10 lg:py-10 bg-white shadow-lg rounded-xl">
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
                      rules={fullnameConstraint}
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
                      rules={usernameConstraint}
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
                      rules={emailConstraint}
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
                      rules={phoneConstraint}
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
                    <Form.Item<RegisterAccountType>
                      name="confirm_password"
                      label="Confirm Password"
                      className="mt-2"
                      rules={confirmPasswordConstraint}
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
                <Col xs={24} lg={12}>
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
                <Col xs={24} lg={12}>
                  <div className="mt-6 lg:mt-0">
                    <Link href={"/forget-password"}>
                      <CustomButton type="default" icon={<ExceptionOutlined />}>
                        Forgot password?
                      </CustomButton>
                    </Link>
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
