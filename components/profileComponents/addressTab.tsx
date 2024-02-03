import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { CustomButton } from "../common";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FacebookOutlined,
  GoogleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { UserAddressType, UserType } from "@/models/userModel";
import { CustomText } from "../homePage/common";
import {
  FieldProfileInformationType,
  FieldProfilePasswordType,
} from "@/models/common";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateUserAddress,
  updateUserInformation,
  updateUserPassword,
} from "@/redux/entities/users/asyncThunk";
import { getUserChangingPasswordLoading } from "@/redux/selectors/user";
import { FormUpdatePassword } from "@/modules/profile/formUpdatePassword";
import { FormUpdateInformation } from "@/modules/profile/formUpdateInformation";
import { useState } from "react";
import { upperFirst } from "lodash";

export const AddressTab = ({ authenAccount }: { authenAccount: UserType }) => {
  const dispatch = useAppDispatch();
  console.log(authenAccount.address);

  const renderAddressCard = (item: UserAddressType, index: number) => {
    const [editingAddress, setEditingAddress] = useState(false);

    const renderText = (text: string) => {
      return (
        <CustomText type="paragraph" extraClass="!text-black">
          {text}
        </CustomText>
      );
    };

    const renderInput = (
      fieldName:
        | "_id"
        | "type"
        | "phone"
        | "street"
        | "district"
        | "ward"
        | "city"
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

    const onFinishUpdateAddress = async (values: UserAddressType) => {
      dispatch(updateUserAddress({ _id: authenAccount._id, ...values }));
    };

    const handleEditAddress = () => {
      setEditingAddress(!editingAddress);
    };

    return (
      <Card className="shadow">
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinishUpdateAddress}
          autoComplete="off"
        >
          {editingAddress ? (
            <>
              <Form.Item<UserAddressType>
                name="index"
                rules={[
                  {
                    required: true,
                    message: "Please input street information",
                  },
                ]}
                initialValue={index}
                hidden
              >
                <Input hidden />
              </Form.Item>
              {renderInput("type")}
              <Divider />
              {renderInput("street")}
              {renderInput("ward")}
              {renderInput("district")}
              {renderInput("city")}
              {renderInput("phone")}
            </>
          ) : (
            <>
              <span className="text-2xl font-bold">
                {renderText(`${item.type}`)}
              </span>
              <Divider />
              {renderText(`Street: ${item.street}`)}
              {renderText(`Ward: ${item.ward}`)}
              {renderText(`District: ${item.district}`)}
              {renderText(`City: ${item.city}`)}
              {renderText(`Phone: ${item.phone}`)}
            </>
          )}
          <Divider />
          <Row>
            <Col className="flex justify-center" span={12}>
              <Button
                key={"edit"}
                icon={editingAddress ? <CloseOutlined /> : <EditOutlined />}
                onClick={() => {
                  handleEditAddress();
                }}
              >
                {editingAddress ? "Close" : "Edit"}
              </Button>
            </Col>
            <Col className="flex justify-center" span={12}>
              {editingAddress ? (
                <Button
                  key={"submit"}
                  htmlType="submit"
                  icon={<CheckOutlined />}
                >
                  Update
                </Button>
              ) : (
                <Button key={"delete"} icon={<DeleteOutlined />}>
                  Delete
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </Card>
    );
  };

  return (
    <>
      <CustomText type="title">Addresses</CustomText>
      <CustomText type="paragraph" extraClass="text-2xl !text-black">
        My delivery addresses
      </CustomText>
      <Button icon={<PlusOutlined />}>Add</Button>
      <Divider />
      <Row gutter={16}>
        {authenAccount.address.map((item: UserAddressType, key: number) => (
          <Col span={6} key={key}>
            {renderAddressCard(item, key)}
          </Col>
        ))}
      </Row>
    </>
  );
};
