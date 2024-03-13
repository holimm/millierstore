import { CustomButton } from "@/components/common";
import { CustomText } from "@/components/homePage/common";
import { emailConstraint } from "@/helpers/constraint/userDataContraint";
import {
  ForgotPasswordAccountType,
  RegisterAccountType,
} from "@/models/userModel";
import { sendEmailResetPassword } from "@/redux/entities/users/asyncThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserResetPasswordSendEmailLoading } from "@/redux/selectors/user";
import {
  CloseOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input, Modal, Result, Spin } from "antd";
import { useEffect, useState } from "react";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const [openSentEmailModal, setOpenSentEmailModal] = useState(false);
  const loadingResetPasswordSendEmail = useAppSelector(
    getUserResetPasswordSendEmailLoading
  );

  useEffect(() => {
    const handleStorage = (event) => {
      setOpenSentEmailModal(true);
    };
    window.addEventListener("open_sent_email_modal", handleStorage);
    return () =>
      window.removeEventListener("open_sent_email_modal", handleStorage);
  }, []);

  const onFinish = async (values: ForgotPasswordAccountType) => {
    dispatch(sendEmailResetPassword(values));
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
          <div className="h-fit w-11/12 lg:w-[30%] p-10 bg-white shadow-lg rounded-xl">
            <Spin spinning={loadingResetPasswordSendEmail.data}>
              <CustomText
                type="paragraph"
                topClass="text-center"
                extraClass="!text-2xl !text-black !font-semibold"
              >
                FORGOT PASSWORD
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
                <Form.Item<RegisterAccountType>
                  name="email"
                  label="Email"
                  className="mt-2"
                  rules={emailConstraint}
                >
                  <Input className="py-3" placeholder="Email" size="middle" />
                </Form.Item>
                <Form.Item className="mt-10">
                  <CustomButton
                    type="primary"
                    htmlType="submit"
                    extraClass="bg-blue-500"
                    icon={<UserAddOutlined />}
                  >
                    Submit
                  </CustomButton>
                </Form.Item>
              </Form>
              <Divider plain>Already have an account?</Divider>
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
            </Spin>
          </div>
        </Flex>
      </div>
    </>
  );
};

export default ForgotPassword;
