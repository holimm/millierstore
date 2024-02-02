import HeaderNavigation from "@/components/headerComponents/header";
import PageFooter from "@/components/const/footer";
import { ReactElement, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ConfigProvider } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/selectors/user";
import { useAuthen } from "@/hooks/useAuthen";

const DefaultLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <HeaderNavigation />
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
      <PageFooter />
    </>
  );
};

export default DefaultLayout;
