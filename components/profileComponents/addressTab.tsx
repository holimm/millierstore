import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Spin,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { UserAddressType, UserType } from "@/models/userModel";
import { CustomText } from "../homePage/common";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteUserAddress,
  updateUserAddress,
} from "@/redux/entities/users/asyncThunk";
import {
  getUserDeleteAddressLoading,
  getUserUpdateAddressLoading,
} from "@/redux/selectors/user";
import { useState } from "react";
import { renderInput, renderText } from "@/modules/profile/addressRender";
import { AddAddressModal } from "@/modules/profile/addAddressModal";
import { isEmpty } from "lodash";

export const AddressTab = ({ authenAccount }: { authenAccount: UserType }) => {
  const dispatch = useAppDispatch();
  const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
  const loadingDeleteAddress = useAppSelector(getUserDeleteAddressLoading);

  console.log(authenAccount.address);

  const renderAddressCard = (item: UserAddressType, index: number) => {
    const loadingUpdateAddress = useAppSelector(getUserUpdateAddressLoading);
    const [editingAddress, setEditingAddress] = useState(false);

    const onFinishUpdateAddress = async (values: UserAddressType) => {
      dispatch(updateUserAddress({ _id: authenAccount._id, ...values }));
    };

    const onClickDeleteAddress = async (values: UserAddressType) => {
      dispatch(deleteUserAddress({ _id: authenAccount._id, ...values }));
    };

    const handleEditAddress = () => {
      setEditingAddress(!editingAddress);
    };

    return (
      <Card className="shadow">
        <Spin spinning={loadingUpdateAddress}>
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
                {renderInput("type", item)}
                <Divider />
                {renderInput("street", item)}
                {renderInput("ward", item)}
                {renderInput("district", item)}
                {renderInput("city", item)}
                {renderInput("phone", item)}
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
                  <Button
                    onClick={() => {
                      onClickDeleteAddress({ index, ...item });
                    }}
                    key={"delete"}
                    icon={<DeleteOutlined />}
                  >
                    Delete
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Spin>
      </Card>
    );
  };

  return (
    <>
      <AddAddressModal
        authenAccount={authenAccount}
        openAddAddressModal={openAddAddressModal}
        setOpenAddAddressModal={setOpenAddAddressModal}
      />
      <CustomText type="title">Addresses</CustomText>
      <CustomText type="paragraph" extraClass="text-2xl !text-black">
        My delivery addresses
      </CustomText>
      <Button
        onClick={() => {
          setOpenAddAddressModal(true);
        }}
        icon={<PlusOutlined />}
      >
        Add
      </Button>
      <Divider />
      <Spin spinning={loadingDeleteAddress}>
        <Row gutter={16}>
          {!isEmpty(authenAccount.address) &&
            authenAccount.address.map((item: UserAddressType, key: number) => (
              <Col className="mb-5" span={8} key={key}>
                {renderAddressCard(item, key)}
              </Col>
            ))}
        </Row>
      </Spin>
    </>
  );
};
