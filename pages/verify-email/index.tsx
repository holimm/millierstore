import { CustomText } from "@/components/homePage/common";
import { createUserAccount } from "@/redux/entities/users/asyncThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserCreateAccountLoading } from "@/redux/selectors/user";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { Button, Flex, Result, Spin } from "antd";
import { debounce, isEmpty } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const VerifyEmail = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token } = router.query;
  const loadingCreateAccount = useAppSelector(getUserCreateAccountLoading);
  const [accountTemp, setAccountTemp] = useState<any>({});
  console.log(loadingCreateAccount);

  const debounced = useCallback(
    debounce((value) => dispatch(createUserAccount(value)), 1000),
    []
  );

  useEffect(() => {
    setAccountTemp(JSON.parse(localStorage.getItem("create_account_temp")));
  }, []);

  useEffect(() => {
    if (!isEmpty(accountTemp) && !isEmpty(token)) {
      const { emailVerifyToken, ...accountData } = accountTemp;
      if (emailVerifyToken === token) {
        debounced(accountData);
      } else {
        console.log("MATCH TOKEN:", false);
      }
    }
  }, [accountTemp, token]);

  return (
    <div className="h-screen w-full shadow-md bg-gradient-to-r from-stone-500 via-neutral-500 to-zinc-500">
      <Flex className="h-full w-full" justify="center" align="center">
        <div className="h-fit w-[60vw] bg-white p-10 rounded-xl">
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
                    ? "Wait a moment! Your email verification is processing. "
                    : loadingCreateAccount.data.status === "success"
                    ? `Congratulations! Your email has been successfully verified.
                    You're now a verified member of our community.`
                    : loadingCreateAccount.data.status === "rejected"
                    ? "Sorry, Your email verification has been rejected. "
                    : "Error"}
                </CustomText>
              }
              extra={[
                <Link href={"/"}>
                  <Button icon={<DoubleLeftOutlined />} size="middle" key="buy">
                    Go back to page
                  </Button>
                </Link>,
              ]}
            />
          </Spin>
        </div>
      </Flex>
    </div>
  );
};

export default VerifyEmail;
