import { CustomText } from "@/components/homePage/common";
import { verifyUserAccount } from "@/redux/entities/users/asyncThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserCreateAccountLoading } from "@/redux/selectors/user";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { Button, Flex, Result, Spin } from "antd";
import { debounce, isEmpty } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

const VerifyEmail = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token } = router.query;
  const loadingCreateAccount = useAppSelector(getUserCreateAccountLoading);

  const debounced = useCallback(
    debounce((value: { emailVerifyToken: any }) => {
      dispatch(verifyUserAccount(value));
    }, 1000),
    []
  );

  useEffect(() => {
    if (!isEmpty(token)) {
      debounced({ emailVerifyToken: token });
    }
  }, [token]);

  return (
    <div className="h-screen w-full shadow-md bg-gradient-to-r from-stone-500 via-neutral-500 to-zinc-500">
      <Flex className="h-full w-full" justify="center" align="center">
        <div className="h-fit w-11/12 lg:w-[60vw] bg-white p-0 lg:p-10 rounded-xl">
          {isEmpty(token) ? (
            <Result
              status="warning"
              title={
                <CustomText
                  type="paragraph"
                  extraClass="!text-black !text-3xl !font-semibold"
                >
                  Email Verification Rejected
                </CustomText>
              }
              subTitle={
                <CustomText
                  type="paragraph"
                  extraClass="!text-neutral-500 !text-lg"
                >
                  Verification token not provided
                </CustomText>
              }
              extra={[
                <Link href={"/"} key={"button_backtopage"}>
                  <Button icon={<DoubleLeftOutlined />} size="middle" key="buy">
                    Go back to page
                  </Button>
                </Link>,
              ]}
            />
          ) : (
            <Spin spinning={loadingCreateAccount.data.status === "pending"}>
              <Result
                status={
                  loadingCreateAccount.data.status === "pending"
                    ? "info"
                    : loadingCreateAccount.data.status === "success"
                    ? "success"
                    : loadingCreateAccount.data.status === "rejected"
                    ? "warning"
                    : "info"
                }
                title={
                  <CustomText
                    type="paragraph"
                    extraClass="!text-black !text-3xl !font-semibold"
                  >
                    Email Verification{" "}
                    {loadingCreateAccount.data.status === "pending"
                      ? "Pending"
                      : loadingCreateAccount.data.status === "success"
                      ? "Successful"
                      : loadingCreateAccount.data.status === "rejected"
                      ? "Rejected"
                      : "Error"}
                  </CustomText>
                }
                subTitle={
                  <CustomText
                    type="paragraph"
                    extraClass="!text-neutral-500 !text-lg"
                  >
                    {loadingCreateAccount.data.status === "pending"
                      ? loadingCreateAccount.data.value
                      : loadingCreateAccount.data.status === "success"
                      ? loadingCreateAccount.data.value
                      : loadingCreateAccount.data.status === "rejected"
                      ? loadingCreateAccount.data.value
                      : "Error"}
                  </CustomText>
                }
                extra={[
                  <Link href={"/"} key={"button_backtopage"}>
                    <Button
                      icon={<DoubleLeftOutlined />}
                      size="middle"
                      key="buy"
                    >
                      Go back to page
                    </Button>
                  </Link>,
                ]}
              />
            </Spin>
          )}
        </div>
      </Flex>
    </div>
  );
};

export default VerifyEmail;
