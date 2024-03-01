import { CustomButton } from "@/components/common";
import { CustomText } from "@/components/homePage/common";
import { RegisterAccountType } from "@/models/userModel";
import {
  ExceptionOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Divider, Flex, Form, Input, Row, Typography } from "antd";
import Link from "next/link";

const RegisterAccount = () => {
  const onFinish = async (values: any) => {
    console.log(values);
  };
  return (
    <div className="h-fit w-full pt-16 pb-24 bg-gradient-to-r from-zinc-100 to-neutral-100">
      <Flex justify="center" align="center">
        <div className="h-fit w-[50vw] p-10 bg-white shadow-lg rounded-xl">
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
                    { required: true, message: "Please input your fullname!" },
                  ]}
                >
                  <Input className="py-3" placeholder="Email" size="middle" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<RegisterAccountType>
                  name="username"
                  label="Username"
                  className="mt-2"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input className="py-3" placeholder="Email" size="middle" />
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
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input className="py-3" placeholder="Email" size="middle" />
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
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input className="py-3" placeholder="Email" size="middle" />
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
                    { required: true, message: "Please input your password!" },
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
                      message: "Please confirm your password!",
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
        </div>
      </Flex>
    </div>
  );
};

export default RegisterAccount;
