import HeaderNavigation from "@/components/headerComponents/header";
import PageFooter from "@/components/const/footer";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const DefaultLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <HeaderNavigation />
      {children}
      <PageFooter />
    </>
  );
};

export default DefaultLayout;
