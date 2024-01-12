import { Button, ButtonProps } from "antd";
import { ButtonShape, ButtonType } from "antd/es/button";
import { BaseButtonProps } from "antd/es/button/button";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { ReactNode } from "react";
import { isEmpty } from "lodash";
import { SigninButtonProps } from "@/models/navModel";

export const SigninButton: React.FC<SigninButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      className={`h-[2.8rem] w-full ${
        !isEmpty(props.extraClass) && props.extraClass
      }`}
      icon={props.icon}
      type={props.type}
      htmlType="submit"
    >
      {children}
    </Button>
  );
};
