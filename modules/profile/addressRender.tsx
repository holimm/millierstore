import { CustomText } from "@/components/homePage/common";
import { UserAddressType } from "@/models/userModel";
import { Form, Input } from "antd";
import { upperFirst } from "lodash";

export const renderText = (text: string) => {
  return (
    <CustomText type="paragraph" extraClass="!text-black">
      {text}
    </CustomText>
  );
};

export const renderInput = (
  fieldName: "_id" | "type" | "phone" | "street" | "district" | "ward" | "city",
  item: UserAddressType
) => {
  return (
    <Form.Item<UserAddressType>
      name={fieldName}
      className="!p-0 !m-3"
      rules={[
        {
          required: true,
          message: "Please input street information",
        },
      ]}
      initialValue={item[fieldName]}
    >
      <Input
        addonBefore={`${upperFirst(fieldName)}:`}
        placeholder={upperFirst(fieldName)}
        size="middle"
      />
    </Form.Item>
  );
};
