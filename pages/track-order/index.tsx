import { Button, Result, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isEmpty, toString } from "lodash";
import { fetchOrderByCode } from "@/redux/entities/orders/asyncThunk";
import { getOrderByCode } from "@/redux/selectors/orders";
import { CheckoutInformationType } from "@/models/orderModel";
import {
  DetailOrderContent,
  DetailOrderModal,
} from "@/modules/orders/detailOrderModal";
import { WaitingLoading } from "@/helpers/renderHelpers";
import { CustomText } from "@/components/homePage/common";
import { CloseOutlined } from "@ant-design/icons";

export default function TrackOrderPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const orderCode: string = toString(router.query.code);
  const emailAccount: string = toString(router.query.email);
  const orderByCode = useAppSelector(getOrderByCode);
  const orderByCodeData: CheckoutInformationType = orderByCode.data;

  useEffect(() => {
    if (!isEmpty(orderCode && emailAccount))
      dispatch(
        fetchOrderByCode({ params: { code: orderCode, email: emailAccount } })
      );
  }, [orderCode, emailAccount]);

  console.log(orderByCode);

  return (
    <>
      {orderByCode.loading === "pending" && (
        <WaitingLoading loading={orderByCode.loading} />
      )}
      {orderByCode.loading === "success" && !isEmpty(orderByCodeData) && (
        <main className={`h-fit w-full`}>
          <div className="h-full w-full flex justify-center items-center">
            <div className="h-fit w-11/12 lg:w-3/4 mx-auto">
              <Spin spinning={orderByCode.loading === "success" ? false : true}>
                <DetailOrderContent currentOrderDetail={orderByCodeData} />
              </Spin>
            </div>
          </div>
        </main>
      )}
      {orderByCode.loading === "error" && (
        <div className="h-[70vh] w-full flex justify-center items-center">
          <Result
            status="error"
            title={
              <CustomText
                type="paragraph"
                extraClass="!text-black !text-3xl !font-semibold"
              >
                Error processing order
              </CustomText>
            }
            subTitle={
              <CustomText
                type="paragraph"
                extraClass="!text-neutral-500 !text-lg"
              >
                We're sorry, but there was an error processing your order.
                Please try again later or contact support for assistance.
              </CustomText>
            }
            extra={[
              <Button icon={<CloseOutlined />} size="middle" key="buy">
                Close
              </Button>,
            ]}
          />
        </div>
      )}
    </>
  );
}
