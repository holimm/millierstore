import { CustomText } from "@/components/homePage/common";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import { CheckoutInformationType, OrderDateType } from "@/models/orderModel";
import { Tag } from "antd";
import dayjs from "dayjs";
import { FaMapMarkedAlt } from "react-icons/fa";

export const getDataAddress = (currentOrderDetail: CheckoutInformationType) => {
  return [
    {
      title: `${currentOrderDetail.name} | ${currentOrderDetail.address.phone}`,
      description: `${currentOrderDetail.address.street}, ${currentOrderDetail.address.ward}, ${currentOrderDetail.address.district}, ${currentOrderDetail.address.city}`,
      avatar: <FaMapMarkedAlt size={"3em"} />,
      tag: <Tag color="success">{currentOrderDetail.address.type}</Tag>,
    },
  ];
};

export const getDataInformation = (
  currentOrderDetail: CheckoutInformationType
) => {
  return [
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
};

export const getTimelineOrderData = (
  currentOrderDetail: CheckoutInformationType
) => {
  return currentOrderDetail.date.map((item: OrderDateType) => {
    let data: { color?: string; label?: string } = {};
    if (item.id === "dateOrder")
      data = { color: "blue", label: "You created the order" };
    if (item.id === "dateDelivering")
      data = { color: "blue", label: "Your package is on its way" };
    if (item.id === "dateDelivered")
      data = {
        color: "green",
        label: "Your package has delivered to your location",
      };
    if (item.id === "dateCancelled")
      data = {
        color: "red",
        label: "You cancelled your order",
      };
    return {
      color: data.color,
      children: (
        <>
          <CustomText type="paragraph" extraClass="!text-black !font-semibold">
            {dayjs(item.dateString).format("HH:mm:ss | DD MMMM YYYY")}
          </CustomText>
          <CustomText type="paragraph" extraClass="!text-black">
            {data.label}
          </CustomText>
        </>
      ),
    };
  });
};
