import { Button, Card, Image } from "antd";
import { isEmpty } from "lodash";
import { SigninButtonProps } from "@/models/navModel";
import { CustomText } from "./homePage/common";
import Link from "next/link";
import { ProductCardType } from "@/models/common";

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

export const RenderProductCard: React.FC<ProductCardType> = (props) => {
  return (
    <Card
      className="bg-white !p-0 !border-none cursor-pointer"
      cover={
        <div className="pl-3 pr-3 pt-5">
          <Image src={props.srcImage} preview={false} />
        </div>
      }
    >
      <div className="h-fit w-full pb-6">
        <CustomText
          type="paragraph"
          extraClass="!text-xl !text-black !font-bold"
          topClass="!text-center"
        >
          {props.name}
        </CustomText>
        <CustomText
          type="paragraph"
          extraClass="!text-lg !text-black !font-sf_pro_text_light"
          topClass="!text-center"
        >
          {props.description}
        </CustomText>
        <CustomText
          type="paragraph"
          extraClass="!text-lg !text-black !font-sf_pro_text_light"
          topClass="!text-center mt-10"
        >
          {props.price}
        </CustomText>
        <div className="h-full w-full flex justify-center items-center mt-4">
          <Link href={`/products/${props.code}`}>
            <Button>
              <span className="!font-sf_pro_text_light">Order now</span>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
