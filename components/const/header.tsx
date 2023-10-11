import React, { useState } from "react";
import { Space, Flex, Typography, Button, Row, Col, Drawer } from "antd";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
const { Title } = Typography;

const HeaderNavigation: React.FC = () => {
  const [showSearchTab, setShowSearchTab] = useState<boolean>(false);
  const handleShowSearchTab = () => {
    setShowSearchTab(!showSearchTab);
  };
  return (
    <>
      <Drawer
        height={"4rem"}
        placement="top"
        open={showSearchTab}
        onClose={handleShowSearchTab}
        closable={false}
      >
        <Space></Space>
      </Drawer>
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
                <h1 className="text-4xl font-lobster pr-8">Raijin Limited</h1>
                <Button type="text">Home</Button>
                <Button type="text">Shop</Button>
                <Button type="text">Blog</Button>
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
                  onClick={handleShowSearchTab}
                ></Button>
                <Button
                  type="text"
                  size="large"
                  icon={<ShoppingCartOutlined />}
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
