import React, { useState } from "react";
import {
  Drawer,
  Input,
  Space,
  Button,
  Row,
  Col,
  Image,
  Flex,
  List,
  Divider,
  Form,
  Checkbox,
  Typography,
  DrawerProps,
} from "antd";
import {
  FacebookOutlined,
  GoogleOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CartDrawer, NavigationDrawer } from "../drawer";
import { FieldType } from "@/models/navModel";
import { SigninButton } from "../common";
import {
  HeaderCartDrawer,
  HeaderSearchDrawer,
  HeaderSigninDrawer,
} from "./headerDrawer";

const HeaderNavigation: React.FC = () => {
  const [showSearchDrawer, setShowSearchDrawer] = useState<boolean>(false);
  const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false);
  const [showSignInDrawer, setShowSignInDrawer] = useState<boolean>(false);
  const handleShowSearchDrawer = () => {
    setShowSearchDrawer(!showSearchDrawer);
  };
  const handleShowCartDrawer = () => {
    setShowCartDrawer(!showCartDrawer);
  };
  const handleShowSignInDrawer = () => {
    setShowSignInDrawer(!showSignInDrawer);
  };

  return (
    <>
      <HeaderSearchDrawer
        open={showSearchDrawer}
        onClose={handleShowSearchDrawer}
      />
      <HeaderCartDrawer open={showCartDrawer} onClose={handleShowCartDrawer} />
      <HeaderSigninDrawer
        open={showSignInDrawer}
        onClose={handleShowSignInDrawer}
      />

      <div className="h-16 w-full fixed top-0 z-50 bg-white shadow-md">
        <div className="h-full w-10/12 mx-auto">
          <Row className="h-full w-full">
            <Col span={12}>
              <Flex
                className="h-full w-full"
                gap={10}
                justify="start"
                align="center"
              >
                <h1 className="text-4xl font-lobster text-black pr-8">
                  Raijin Limited
                </h1>
                <Button type="text">Home</Button>
                <Button type="text">Shop</Button>
                <Button type="text">Blog</Button>
                <Button type="text">About</Button>
                <Button type="text">Contact</Button>
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
                <Button
                  type="text"
                  size="large"
                  icon={<UserOutlined />}
                  onClick={handleShowSignInDrawer}
                ></Button>
              </Flex>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default HeaderNavigation;