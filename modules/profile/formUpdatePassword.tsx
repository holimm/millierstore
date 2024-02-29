import { CustomButton } from "@/components/common";
import { FieldProfilePasswordType } from "@/models/common";
import { UserType } from "@/models/userModel";
import { updateUserPassword } from "@/redux/entities/users/asyncThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserChangingPasswordLoading } from "@/redux/selectors/user";
import { Col, Form, Input, Row, Spin } from "antd";

export const FormUpdatePassword = ({
  authenAccount,
}: {
  authenAccount: UserType;
}) => {
  const dispatch = useAppDispatch();
  const loadingChangingPassword = useAppSelector(
    getUserChangingPasswordLoading
  );
  const onFinishUpdatePassword = async (values: FieldProfilePasswordType) => {
    dispatch(updateUserPassword({ _id: authenAccount._id, ...values }));
  };
  return (
    <Spin spinning={loadingChangingPassword.data}>
      <Form
        name="basic"
        layout="vertical"
        className="w-full mb-10"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinishUpdatePassword}
        autoComplete="off"
        disabled={loadingChangingPassword.data}
      >
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item<FieldProfilePasswordType>
              name="old_password"
              label="Old password"
              rules={[
                { required: true, message: "Please input your old password" },
              ]}
            >
              <Input.Password
                className="py-3"
                placeholder="Old password"
                size="middle"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item<FieldProfilePasswordType>
              name="new_password"
              label="New password"
              rules={[
                { required: true, message: "Please input your new password" },
              ]}
            >
              <Input.Password
                className="py-3"
                placeholder="New password"
                size="middle"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldProfilePasswordType>
              name="new_password_confirm"
              label="Confirm new password"
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                className="py-3"
                placeholder="Confirm new password"
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
            Update Password
          </CustomButton>
        </Form.Item>
      </Form>
    </Spin>
  );
};
