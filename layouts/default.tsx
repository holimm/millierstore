import HeaderNavigation from "@/components/const/header";
import PageFooter from "@/components/const/footer";
import { ReactElement } from "react";

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
