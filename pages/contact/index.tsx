import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Divider, Form, Input, Spin, Typography } from "antd";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { ContactFormType } from "@/models/contactModel";
import { createContactNode } from "@/redux/entities/contact/asyncThunk";
import {
  emailConstraint,
  fullnameConstraint,
} from "@/helpers/constraint/userDataContraint";
import { CustomButton } from "@/components/common";
import { loadingCreateContactNode } from "@/redux/selectors/contacts";
import { useAuthen } from "@/hooks/useAuthen";

export default function Home() {
  const dispatch = useAppDispatch();
  const authenAccount = useAuthen();
  const [form] = Form.useForm();
  const loadingCreateContact = useAppSelector(loadingCreateContactNode);

  useEffect(() => {
    form.setFieldValue("email", authenAccount ? authenAccount.email : "");
  }, [authenAccount]);

  const onFinishCheckout = async (values: ContactFormType) => {
    dispatch(createContactNode(values));
  };

  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full py-12 bg-gradient-to-r from-neutral-200 to-neutral-100">
        <div className="h-fit w-11/12 lg:w-1/2 mx-auto px-5 lg:px-10 py-10 lg:py-20 bg-white rounded-lg shadow-lg">
          <Spin spinning={loadingCreateContact.data}>
            <div className="h-fit w-full">
              <Typography.Title className="text-center">
                <span className="!font-sf_pro !text-black">Contact us</span>
              </Typography.Title>
              <Typography.Paragraph className="text-center">
                <span className="!font-sf_pro !text-neutral-400">
                  *Due to the limitations of the database management system, you
                  can only submit two forms.
                </span>
              </Typography.Paragraph>
              <Divider className="mt-4 mb-10" />
              <Form
                form={form}
                name="basic"
                layout="vertical"
                className="w-full"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                onFinish={onFinishCheckout}
                autoComplete="off"
                initialValues={{
                  email: "",
                  fullname: "",
                  subject: "",
                  content: "",
                }}
              >
                <Form.Item<ContactFormType>
                  name="email"
                  label={"Email"}
                  rules={emailConstraint}
                >
                  <Input
                    className="py-3"
                    placeholder="Email"
                    size="middle"
                    disabled={isEmpty(authenAccount) ? false : true}
                  />
                </Form.Item>
                <Form.Item<ContactFormType>
                  className="mt-8"
                  name="fullname"
                  label={"Fullname"}
                  rules={fullnameConstraint}
                >
                  <Input
                    className="py-3"
                    placeholder="Fullname"
                    size="middle"
                  />
                </Form.Item>
                <Form.Item<ContactFormType>
                  className="mt-8"
                  name="subject"
                  label={"Subject"}
                  rules={[{ required: true, message: "Please input subject" }]}
                >
                  <Input className="py-3" placeholder="Subject" size="middle" />
                </Form.Item>
                <Form.Item<ContactFormType>
                  className="mt-8"
                  name="content"
                  label={"Content"}
                  rules={[
                    { required: true, message: "Please input your content" },
                  ]}
                >
                  <Input.TextArea
                    className="p-5"
                    placeholder="Content"
                    autoSize={{ minRows: 6, maxRows: 8 }}
                    maxLength={300}
                    showCount
                  />
                </Form.Item>
                <Form.Item className="w-fit mt-10">
                  <CustomButton
                    type="primary"
                    htmlType="submit"
                    extraClass="bg-blue-500 px-10"
                  >
                    Submit
                  </CustomButton>
                </Form.Item>
              </Form>
            </div>
          </Spin>
        </div>
      </div>
    </main>
  );
}
