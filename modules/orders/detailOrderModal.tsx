import { CustomText } from "@/components/homePage/common";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import { CheckoutInformationType } from "@/models/orderModel";
import { UserType } from "@/models/userModel";
import { useAppDispatch } from "@/redux/hooks";
import {
  Button,
  Card,
  Col,
  Divider,
  List,
  Modal,
  Row,
  Tag,
  Timeline,
} from "antd";
import dayjs from "dayjs";
import { isEmpty, toUpper } from "lodash";
import { ListCart } from "./listCart";
import { FaMapMarkedAlt } from "react-icons/fa";

export const DetailOrderModal = ({
  authenAccount,
  currentOrderDetail,
  openDetailOrderModal,
  setOpenDetailOrderModal,
}: {
  authenAccount: UserType;
  currentOrderDetail: CheckoutInformationType;
  openDetailOrderModal: boolean;
  setOpenDetailOrderModal: any;
}) => {
  const dispatch = useAppDispatch();

  const renderInformation = (data: { label: string; value: string }) => (
    <CustomText type="paragraph" extraClass="!text-black" topClass="mt-4">
      <span className="font-semibold">{data.label}</span>
      {data.value}
    </CustomText>
  );

  const renderInformationColumn = (data: { label: string; value: string }) => (
    <Col span={8}>
      <div className="h-fit w-full my-2 mx-auto md:w-fit">
        <h1>{data.label}</h1>
        <b>{data.value}</b>
      </div>
    </Col>
  );

  const renderOrderButton = (label) => (
    <Col span={12}>
      <Button
        className="h-10 w-full text-black !bg-neutral-600 rounded-md"
        size="large"
      >
        {label}
      </Button>
    </Col>
  );

  const dataAddress = [
    {
      title: `${currentOrderDetail.name} | ${currentOrderDetail.address.phone}`,
      description: `${currentOrderDetail.address.street}, ${currentOrderDetail.address.ward}, ${currentOrderDetail.address.district}, ${currentOrderDetail.address.city}`,
      avatar: <FaMapMarkedAlt size={"3em"} />,
      tag: <Tag color="success">{currentOrderDetail.address.type}</Tag>,
    },
  ];

  const dataInformation = [
    {
      title: "Recipient",
      description: currentOrderDetail.name,
    },
    {
      title: "Payment Method",
      description: currentOrderDetail.method,
    },
    {
      title: "Note",
      description: currentOrderDetail.note,
    },
    {
      title: "Total",
      description: NumberToDollarFormat(currentOrderDetail.total),
    },
  ];

  return (
    <Modal
      width={"60vw"}
      open={openDetailOrderModal}
      onOk={() => setOpenDetailOrderModal(false)}
      onCancel={() => setOpenDetailOrderModal(false)}
      footer={false}
      centered
    >
      <Divider />
      <Card className="shadow">
        <Row gutter={12}>
          {renderInformationColumn({
            label: "Order ID",
            value: `#
            ${toUpper(
              currentOrderDetail._id.substr(currentOrderDetail._id.length - 7)
            )}`,
          })}
          {renderInformationColumn({
            label: "Order Date",
            value: dayjs(currentOrderDetail.date[0].dateString).format(
              "HH:mm:ss | DD MMMM, YYYY"
            ),
          })}
          {renderInformationColumn({
            label: "Estimated Time of Arrival",
            value: "N/A",
          })}
        </Row>
      </Card>
      <Row className="mt-5" gutter={12}>
        {renderOrderButton("Assign Order")}
        {renderOrderButton("Cancel Order")}
      </Row>
      <Row className="mt-5" gutter={16}>
        <Col span={12}>
          <CustomText
            type="paragraph"
            extraClass="!text-black !font-semibold"
            topClass="!text-xl"
          >
            Delivery Information
          </CustomText>
          <Divider />
          <List
            itemLayout="horizontal"
            dataSource={dataAddress}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={item.avatar}
                  title={item.title}
                  description={
                    <>
                      {item.tag}
                      {item.description}
                    </>
                  }
                />
              </List.Item>
            )}
            bordered
          />
          <List
            className="mt-8"
            itemLayout="horizontal"
            dataSource={dataInformation}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
            bordered
          />
        </Col>
        <Col span={12}>
          <CustomText
            type="paragraph"
            extraClass="!text-black !font-semibold"
            topClass="!text-xl"
          >
            Products
          </CustomText>
          <Divider />
          <ListCart cartList={currentOrderDetail.product} maxHeight="52vh" />
        </Col>
      </Row>
      <CustomText
        type="paragraph"
        extraClass="!text-black !font-semibold"
        topClass="!text-xl"
      >
        Delivery Timeline
      </CustomText>
      <Divider />
      <Timeline
        className="mt-20"
        mode="left"
        items={[
          {
            label: "2015-09-01",
            children: "Create a services",
          },
          {
            label: "2015-09-01 09:12:11",
            children: "Solve initial network problems",
          },
          {
            children: "Technical testing",
          },
          {
            label: "2015-09-01 09:12:11",
            children: "Network problems being solved",
          },
        ]}
      />
    </Modal>
  );
};
