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
  DeleteOutlined,
  FacebookOutlined,
  GoogleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ReactNode, useMemo } from "react";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import {
  DescriptionItemModel,
  NavDrawerModel,
  NavigationDrawerProps,
} from "@/models/navModel";

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  children,
  ...props
}) => {
  return (
    <Drawer
      className={props.className}
      height={props.height}
      width={props.width}
      title={props.title}
      placement={props.placement}
      open={props.open}
      onClose={props.onClose}
      closable={props.closable}
    >
      {children}
    </Drawer>
  );
};

export const CartDrawer = (props: NavDrawerModel) => {
  return (
    <Drawer
      height={"4rem"}
      placement={props.placement}
      open={props.showDrawer}
      onClose={props.handleShowDrawer}
      title={"My Cart"}
      width={"30vw"}
      closable={true}
    ></Drawer>
  );
};
