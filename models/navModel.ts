import { ButtonShape, ButtonType } from "antd/es/button";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { ReactNode } from "react";

type Placement = "left" | "right" | "top" | "bottom";

export interface NavDrawerModel {
  placement: Placement;
  showDrawer: boolean;
  handleShowDrawer: () => void;
}

export interface DescriptionItemModel {
  title?: string;
  content?: React.ReactNode;
  quantity?: number;
  price?: number;
  total?: number;
  type: string;
}

export interface FieldType {
  username?: string;
  password?: string;
  remember?: string;
}

export interface SigninButtonProps {
  children: ReactNode;
  type?: ButtonType;
  icon?: React.ReactNode;
  shape?: ButtonShape;
  size?: SizeType;
  disabled?: boolean;
  loading?:
    | boolean
    | {
        delay?: number;
      };
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  [key: `data-${string}`]: string;
  classNames?: {
    icon: string;
  };
  styles?: {
    icon: React.CSSProperties;
  };
  htmlType?: "button" | "submit" | "reset";
  extraClass?: string;
}

export interface NavigationDrawerProps {
  children?: ReactNode;
  height?: string | number;
  width?: string | number;
  title?: string;
  closable?: boolean;
  placement?: "left" | "right" | "top" | "bottom";
  open?: boolean;
  onClose?: () => void;
  onFinish?: () => void;
  onFinishFailed?: () => void;
}
