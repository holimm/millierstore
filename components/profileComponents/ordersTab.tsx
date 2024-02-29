import { Card, Col, Divider, Empty, Row, Spin } from "antd";
import { UserType } from "@/models/userModel";
import { CustomText } from "../homePage/common";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getOrders } from "@/redux/selectors/orders";
import { useEffect, useState } from "react";
import { fetchOrdersByAccountId } from "@/redux/entities/orders/asyncThunk";
import { CheckoutInformationType } from "@/models/orderModel";
import { isEmpty } from "lodash";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import dayjs from "dayjs";
import { DetailOrderModal } from "@/modules/orders/detailOrderModal";

export const OrdersTab = ({ authenAccount }: { authenAccount: UserType }) => {
  const dispatch = useAppDispatch();
  const [currentOrderDetail, setCurrentOrderDetail] =
    useState<CheckoutInformationType>();
  const [openDetailOrderModal, setOpenDetailOrderModal] = useState(false);
  const accountOrders = useAppSelector(getOrders);

  useEffect(() => {
    dispatch(fetchOrdersByAccountId(authenAccount._id));
  }, [authenAccount]);

  const handleOpenDetailOrderModal = (orderDetail: CheckoutInformationType) => {
    setCurrentOrderDetail(orderDetail);
    setOpenDetailOrderModal(true);
  };

  return (
    <>
      {!isEmpty(currentOrderDetail) && (
        <DetailOrderModal
          authenAccount={authenAccount}
          currentOrderDetail={currentOrderDetail}
          openDetailOrderModal={openDetailOrderModal}
          setOpenDetailOrderModal={setOpenDetailOrderModal}
        />
      )}
      <CustomText type="title">Orders</CustomText>
      <CustomText type="paragraph" extraClass="text-2xl !text-black">
        My orders
      </CustomText>
      <Divider />
      <Spin spinning={accountOrders.loading}>
        <Row gutter={16}>
          {!isEmpty(accountOrders.data) ? (
            accountOrders.data.map((item: CheckoutInformationType) => (
              <Col span={8}>
                <Card
                  className="shadow hover:border-1 hover:border-blue-400 transition-all duration-500 cursor-pointer"
                  onClick={() => handleOpenDetailOrderModal(item)}
                >
                  <CustomText type="paragraph" extraClass="!text-black">
                    <span className="font-semibold">Status: </span>
                    {item._id}
                  </CustomText>
                  <Divider />
                  <CustomText type="paragraph" extraClass="!text-black">
                    <span className="font-semibold">Order ID: </span>
                    {item._id}
                  </CustomText>
                  <CustomText type="paragraph" extraClass="!text-black">
                    <span className="font-semibold">Recipient: </span>
                    {item.name}
                  </CustomText>
                  <CustomText type="paragraph" extraClass="!text-black">
                    <span className="font-semibold">Payment Method: </span>
                    {item.method}
                  </CustomText>
                  <CustomText type="paragraph" extraClass="!text-black">
                    <span className="font-semibold">Total: </span>
                    {NumberToDollarFormat(item.total)}
                  </CustomText>
                  <CustomText type="paragraph" extraClass="!text-black">
                    <span className="font-semibold">Order Date: </span>
                    {dayjs(item.date[0].dateString).format(
                      "HH:mm:ss | DD MMMM, YYYY"
                    )}
                  </CustomText>
                </Card>
              </Col>
            ))
          ) : (
            <Empty className="my-10 mx-auto" />
          )}
        </Row>
      </Spin>
    </>
  );
};
