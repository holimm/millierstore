import HeaderNavigation from "@/components/headerComponents/header";
import PageFooter from "@/components/const/footer";
import { ReactElement, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ConfigProvider } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/selectors/user";
import { useAuthen } from "@/hooks/useAuthen";

const DefaultLayout = ({
  children,
  onlyContent,
}: {
  children: ReactElement;
  onlyContent?: boolean;
}) => {
  return (
    <>
      {!onlyContent && <HeaderNavigation />}
      <ConfigProvider
        theme={{
          components: {
            Collapse: {
              headerPadding: 0,
              contentPadding: 0,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
      {!onlyContent && <PageFooter />}
    </>
  );
};

export default DefaultLayout;
