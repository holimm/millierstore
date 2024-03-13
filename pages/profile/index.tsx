import AuthGate from "@/components/authGate";
import { AddressTab } from "@/components/profileComponents/addressTab";
import { OrdersTab } from "@/components/profileComponents/ordersTab";
import { ProfileTab } from "@/components/profileComponents/profileTab";
import { UserType } from "@/models/userModel";
import {
  BookOutlined,
  CreditCardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import React, { useState } from "react";

const { Header, Content, Sider } = Layout;

const itemMenu: MenuProps["items"] = [
  {
    key: "profileTab",
    icon: <UserOutlined />,
    label: "Profile",
  },
  {
    key: "orderTab",
    icon: <CreditCardOutlined />,
    label: "Orders",
  },
  {
    key: "addressesTab",
    icon: <BookOutlined />,
    label: "Addresses",
  },
];

export default function Profile() {
  const [currentTab, setCurrentTab] = useState<string>("profileTab");

  const onClickMenu: MenuProps["onClick"] = (e) => {
    setCurrentTab(e.key);
  };

  return (
    <AuthGate>
      {(authenAccount: UserType) => (
        <div className="h-full w-full px-0 lg:px-20 pt-4 lg:pt-16 pb-10 lg:pb-20 flex justify-center items-center bg-neutral-100">
          <Layout className="h-full w-full">
            <Header className="!px-0 block lg:hidden">
              <Menu
                theme="light"
                className="h-full w-full"
                mode="horizontal"
                defaultSelectedKeys={["profileTab"]}
                defaultOpenKeys={["profileTab"]}
                onClick={onClickMenu}
                items={itemMenu}
              />
            </Header>
            <Content>
              <Layout className="py-3 lg:px-5 lg:py-5 bg-white lg:rounded-xl shadow-md">
                <Sider className="bg-white hidden lg:block" width={200}>
                  <Menu
                    className="h-full"
                    mode="inline"
                    defaultSelectedKeys={["profileTab"]}
                    defaultOpenKeys={["profileTab"]}
                    onClick={onClickMenu}
                    items={itemMenu}
                  />
                </Sider>
                <Content className="px-4 pt-0 pb-10 lg:px-10 lg:py-10 min-h-[40em]">
                  {currentTab === "profileTab" && (
                    <ProfileTab
                      authenAccount={authenAccount && authenAccount}
                    />
                  )}
                  {currentTab === "orderTab" && (
                    <OrdersTab authenAccount={authenAccount && authenAccount} />
                  )}
                  {currentTab === "addressesTab" && (
                    <AddressTab
                      authenAccount={authenAccount && authenAccount}
                    />
                  )}
                </Content>
              </Layout>
            </Content>
          </Layout>
        </div>
      )}
    </AuthGate>
  );
}
