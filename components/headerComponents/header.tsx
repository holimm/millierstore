import React, { useEffect, useState } from "react";
import { Button, Row, Col, Flex } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  HeaderCartDrawer,
  HeaderProfileDropdown,
  HeaderSearchDrawer,
  HeaderSigninDrawer,
} from "./headerDrawer";
import Link from "next/link";
import { useAuthen } from "@/hooks/useAuthen";
import { CustomText } from "../homePage/common";

const HeaderNavigation: React.FC = () => {
  const authentication = useAuthen();
  const [showSearchDrawer, setShowSearchDrawer] = useState<boolean>(false);
  const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false);
  const [showSignInDrawer, setShowSignInDrawer] = useState<boolean>(false);

  useEffect(() => {
    const handleStorage = (event) => {
      setShowSignInDrawer(true);
    };
    window.addEventListener("open_signin_drawer", handleStorage);
    return () =>
      window.removeEventListener("open_signin_drawer", handleStorage);
  }, []);

  const handleShowSearchDrawer = () => {
    setShowSearchDrawer(!showSearchDrawer);
  };
  const handleShowCartDrawer = () => {
    setShowCartDrawer(!showCartDrawer);
  };
  const handleShowSignInDrawer = () => {
    setShowSignInDrawer(!showSignInDrawer);
  };

  const ScreenButton = ({
    linkHref,
    label,
  }: {
    linkHref: string;
    label: string;
  }) => {
    return (
      <Link href={linkHref}>
        <Button type="text" className="!font-sf_pro">
          <CustomText type="paragraph" extraClass="!text-black">
            {label}
          </CustomText>
        </Button>
      </Link>
    );
  };

  return (
    <>
      <HeaderSearchDrawer
        open={showSearchDrawer}
        onClose={handleShowSearchDrawer}
      />
      <HeaderCartDrawer open={showCartDrawer} onClose={handleShowCartDrawer} />
      {!authentication && (
        <HeaderSigninDrawer
          open={showSignInDrawer}
          onClose={handleShowSignInDrawer}
        />
      )}
      <div className="h-16 w-full sticky top-0 z-50 bg-white shadow-md">
        <div className="h-full w-3/4 mx-auto">
          <Row className="h-full w-full">
            <Col span={12}>
              <Flex
                className="h-full w-full"
                gap={10}
                justify="start"
                align="center"
              >
                <h1 className="text-4xl !font-lobster text-black pr-8">
                  Millier
                </h1>
                <ScreenButton linkHref="/" label="Home" />
                <ScreenButton linkHref="/products" label="Shop" />
                <ScreenButton linkHref="/blogs" label="Blog" />
                <ScreenButton linkHref="/about" label="About" />
                <ScreenButton linkHref="/contact" label="Contact" />
              </Flex>
            </Col>
            <Col span={12}>
              <Flex
                className="h-full w-full"
                gap={15}
                justify="end"
                align="center"
              >
                <Button
                  type="text"
                  size="large"
                  icon={<SearchOutlined />}
                  onClick={handleShowSearchDrawer}
                ></Button>
                <Button
                  type="text"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleShowCartDrawer}
                ></Button>
                {authentication ? (
                  <HeaderProfileDropdown authenData={authentication} />
                ) : (
                  <Button
                    type="text"
                    size="large"
                    icon={<UserOutlined />}
                    onClick={handleShowSignInDrawer}
                  ></Button>
                )}
              </Flex>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default HeaderNavigation;
