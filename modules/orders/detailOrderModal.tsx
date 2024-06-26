import { CustomText } from "@/components/homePage/common";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import { CheckoutInformationType, OrderDateType } from "@/models/orderModel";
import { UserType } from "@/models/userModel";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Button,
  Card,
  Col,
  Divider,
  List,
  Modal,
  Popconfirm,
  Row,
  Spin,
  Tag,
  Timeline,
} from "antd";
import dayjs from "dayjs";
import { findLast, isEmpty, toUpper } from "lodash";
import { ListCart } from "./listCart";
import { FaMapMarkedAlt } from "react-icons/fa";
import { getCancelOrderLoading } from "@/redux/selectors/orders";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { cancelOrderById } from "@/redux/entities/orders/asyncThunk";
import { useRef } from "react";
import {
  getDataAddress,
  getDataInformation,
  getTimelineOrderData,
} from "./orderDetailDatas";

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
  return (
    <Modal
      width={"fit-content"}
      open={openDetailOrderModal}
      onOk={() => setOpenDetailOrderModal(false)}
      onCancel={() => setOpenDetailOrderModal(false)}
      footer={false}
      centered
    >
      <div className="h-fit w-full lg:w-[60vw]">
        <DetailOrderContent currentOrderDetail={currentOrderDetail} />
      </div>
    </Modal>
  );
};

export const DetailOrderContent = ({
  currentOrderDetail,
}: {
  currentOrderDetail: CheckoutInformationType;
}) => {
  const dispatch = useAppDispatch();
  const onCancelOrder = async (idOrder: string) => {
    dispatch(cancelOrderById(idOrder));
  };
  const dataAddress = getDataAddress(currentOrderDetail);
  const dataInformation = getDataInformation(currentOrderDetail);
  const timelineOrderData = getTimelineOrderData(currentOrderDetail);
  const timelineOrderDataLast = findLast(currentOrderDetail.date);
  const loadingCancelOrder = useAppSelector(getCancelOrderLoading);

  const renderInformationColumn = (data: { label: string; value: string }) => (
    <Col xs={24} lg={8}>
      <div className="h-fit w-full my-2 mx-auto md:w-fit">
        <h1>{data.label}</h1>
        <b>{data.value}</b>
      </div>
    </Col>
  );
  return (
    <Spin spinning={loadingCancelOrder.data}>
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
        <Col span={12}>
          <Button className="h-10 w-full text-black rounded-md" size="large">
            Assign Order
          </Button>
        </Col>
        <Col span={12}>
          <Popconfirm
            title="Cancel order"
            description="Are you sure to cancel this order?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => onCancelOrder(currentOrderDetail._id)}
            okText="Yes"
            okType="danger"
            cancelText="No"
          >
            <Button
              className="h-10 w-full text-black rounded-md"
              size="large"
              disabled={timelineOrderDataLast.id !== "dateOrder"}
            >
              Cancel Order
            </Button>
          </Popconfirm>
        </Col>
      </Row>
      <Row className="mt-5" gutter={16}>
        <Col xs={24} lg={12}>
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
        <Col xs={24} lg={12}>
          <CustomText
            type="paragraph"
            extraClass="!text-black !font-semibold"
            topClass="!text-xl !mt-6 !lg:mt-0"
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
        topClass="!text-xl mt-8"
      >
        Delivery Timeline
      </CustomText>
      <Divider />
      <Timeline
        pending={
          timelineOrderDataLast.id === "dateDelivered" ||
          timelineOrderDataLast.id === "dateCancelled"
            ? null
            : "Processing your order..."
        }
        className="mt-20 pb-20"
        mode="alternate"
        items={timelineOrderData}
      />
    </Spin>
  );
};
