import { AddressTab } from "@/components/profileComponents/addressTab";
import { ProfileTab } from "@/components/profileComponents/profileTab";
import { useAuthen } from "@/hooks/useAuthen";
import {
  BookOutlined,
  CreditCardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import React, { useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

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
  const authenAccount = useAuthen();

  const onClickMenu: MenuProps["onClick"] = (e) => {
    setCurrentTab(e.key);
  };

  return (
    <div className="h-full w-full px-20 pt-16 pb-20 flex justify-center items-center bg-neutral-100">
      <Layout className="h-full w-full">
        <Content>
          <Layout className="p-5 bg-white rounded-xl shadow-md">
            <Sider className="bg-white" width={200}>
              <Menu
                className="h-full"
                mode="inline"
                defaultSelectedKeys={["profileTab"]}
                defaultOpenKeys={["profileTab"]}
                onClick={onClickMenu}
                items={itemMenu}
              />
            </Sider>
            <Content className="p-10 min-h-[40em]">
              {currentTab === "profileTab" && (
                <ProfileTab authenAccount={authenAccount && authenAccount} />
              )}
              {currentTab === "orderTab" && <>Order</>}
              {currentTab === "addressesTab" && (
                <AddressTab authenAccount={authenAccount && authenAccount} />
              )}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
}
