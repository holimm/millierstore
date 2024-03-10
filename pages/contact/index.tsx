import { CustomText } from "@/components/homePage/common";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Divider, Form, Input, Spin, Typography } from "antd";
import { isEmpty } from "lodash";
import Link from "next/link";
import { ReactNode } from "react";
import { ContactFormType } from "@/models/contactModel";
import { createContactNode } from "@/redux/entities/contact/asyncThunk";
import {
  emailConstraint,
  fullnameConstraint,
} from "@/helpers/constraint/userDataContraint";
import { CustomButton } from "@/components/common";
import { loadingCreateContactNode } from "@/redux/selectors/contacts";

export default function Home() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const loadingCreateContact = useAppSelector(loadingCreateContactNode);

  const onFinishCheckout = async (values: ContactFormType) => {
    dispatch(createContactNode(values));
  };

  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full py-12 bg-gradient-to-r from-neutral-200 to-neutral-100">
        <div className="h-fit w-1/2 mx-auto py-20 bg-white rounded-lg shadow-lg px-10">
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
                  <Input className="py-3" placeholder="Email" size="middle" />
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
