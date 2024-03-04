import { CustomButton } from "@/components/common";
import { CustomText } from "@/components/homePage/common";
import { generateUUIDToken } from "@/helpers/commonHelpers";
import {
  confirmPasswordConstraint,
  emailConstraint,
  fullnameConstraint,
  passwordConstraint,
  phoneConstraint,
  usernameConstraint,
} from "@/helpers/constraint/userDataContraint";
import {
  ForgotPasswordAccountType,
  RegisterAccountType,
} from "@/models/userModel";
import {
  createUserAccount,
  resetPassword,
  sendEmailResetPassword,
} from "@/redux/entities/users/asyncThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getUserCreateAccountLoading,
  getUserCreateAccountSendEmailLoading,
  getUserResetPasswordLoading,
  getUserResetPasswordSendEmailLoading,
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
import { isEmpty, toString } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token } = router.query;
  const [openSentEmailModal, setOpenSentEmailModal] = useState(false);
  const loadingResetPassword = useAppSelector(getUserResetPasswordLoading);

  useEffect(() => {
    const handleStorage = (event) => {
      setOpenSentEmailModal(true);
    };
    window.addEventListener("open_reset_password_modal", handleStorage);
    return () =>
      window.removeEventListener("open_reset_password_modal", handleStorage);
  }, []);

  const onFinish = async (values: ForgotPasswordAccountType) => {
    const { confirm_password, ...valuesWithoutConfirmPassword } = values;
    if (!isEmpty(token)) {
      const data = {
        ...valuesWithoutConfirmPassword,
        emailVerifyToken: toString(token),
      };
      dispatch(resetPassword(data));
    }
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
              Success
            </CustomText>
          }
          subTitle={
            <CustomText
              type="paragraph"
              extraClass="!text-neutral-500 !text-lg"
            >
              You have successfully resetted your password
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
          <div className="h-fit w-[30vw] p-10 bg-white shadow-lg rounded-xl">
            <Spin spinning={loadingResetPassword.data}>
              <CustomText
                type="paragraph"
                topClass="text-center"
                extraClass="!text-2xl !text-black !font-semibold"
              >
                RESET PASSWORD
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
                <Form.Item className="mt-10">
                  <CustomButton
                    type="primary"
                    htmlType="submit"
                    extraClass="bg-blue-500"
                    icon={<UserOutlined />}
                  >
                    Reset password
                  </CustomButton>
                </Form.Item>
              </Form>
            </Spin>
          </div>
        </Flex>
      </div>
    </>
  );
};

export default ForgotPassword;
