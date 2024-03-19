import { Button, Card, Image } from "antd";
import { motion } from "framer-motion";
import { isEmpty } from "lodash";
import { DescriptionItemModel, SigninButtonProps } from "@/models/navModel";
import { CustomText } from "./homePage/common";
import Link from "next/link";
import { ProductCardType } from "@/models/common";
import {
  productDescriptionImageVariants,
  productDescriptionVariants,
} from "@/models/productDetailModel";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";

export const CustomButton: React.FC<SigninButtonProps> = ({
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
          <Image
            src={`${process.env.MONGO_BE_URL}${props.srcImage}`}
            preview={false}
          />
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

export const renderTitle = ({
  title,
  topClass,
}: {
  title: string;
  topClass: string;
}) => {
  return (
    <>
      {title !== "null" && (
        <CustomText
          type="paragraph"
          extraClass="!text-black !text-3xl font-semibold"
          topClass={topClass}
        >
          {title}
        </CustomText>
      )}
    </>
  );
};

export const CategoryDescriptionTabItem = ({
  type,
  title,
  content,
}: {
  type:
    | "contain-image"
    | "contain-image-split"
    | "contain-image-split-grey"
    | "contain-image-grey"
    | "dual-contain-image-grey"
    | "image-card";
  title: string;
  content: {
    semiTitle: string;
    text: string;
    image: string;
  }[];
}) => {
  const renderItem = () => {
    if (type === "contain-image")
      return (
        <motion.div
          viewport={{ once: true }}
          initial="offscreen"
          whileInView="onscreen"
          variants={productDescriptionVariants}
        >
          {content.map((item: any, index: number) => {
            return (
              <div className="h-fit w-full" key={index}>
                <motion.div className="bg-neutral-100 h-fit w-full my-10 pt-4 relative rounded-xl">
                  <div className="h-fit w-full my-8">
                    <div className="h-fit w-full">
                      <CustomText
                        type="paragraph"
                        extraClass="!text-black !text-xl !font-sf_pro_text_light"
                        topClass="w-2/3 mx-auto text-center lg:mt-10"
                      >
                        {renderTitle({
                          title: title,
                          topClass: "!text-center mt-10",
                        })}
                        {!isEmpty(item.semiTitle) && (
                          <CustomText
                            type="paragraph"
                            extraClass="!text-black !text-3xl font-semibold"
                            topClass="!text-center mt-10"
                          >
                            {item.semiTitle}
                          </CustomText>
                        )}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.text,
                          }}
                        ></div>
                      </CustomText>
                      <img
                        className="object-contain object-bottom mx-auto w/3/4 lg:w-1/2"
                        src={`${process.env.MONGO_BE_URL}${item.image}`}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      );
    if (type === "contain-image-split")
      return (
        <motion.div
          viewport={{ once: true }}
          initial="offscreen"
          whileInView="onscreen"
          variants={productDescriptionVariants}
        >
          {content.map((item: any, index: number) => {
            return (
              <div className="h-fit w-full" key={index}>
                <motion.div className="bg-white h-fit w-full my-10 py-4 relative rounded-xl">
                  <div className="h-fit w-full my-4 lg:my-8">
                    <div className="h-fit w-full grid grid-cols-1 lg:grid-cols-2">
                      <CustomText
                        type="paragraph"
                        extraClass="!text-black !text-xl !font-sf_pro_text_light"
                        topClass="w-11/12 lg:w-2/3 mx-auto text-start lg:mt-10"
                      >
                        {renderTitle({ title: title, topClass: "!text-start" })}
                        {!isEmpty(item.semiTitle) && (
                          <CustomText
                            type="paragraph"
                            extraClass="!text-neutral-500 !text-4xl font-semibold"
                            topClass="!text-start"
                          >
                            {item.semiTitle}
                          </CustomText>
                        )}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.text,
                          }}
                        ></div>
                      </CustomText>
                      <div className="h-full w-9/12 mx-auto mt-2 lg:mt-0 lg:w-full flex justify-center items-end">
                        <img
                          className="object-contain object-bottom mx-auto"
                          src={`${process.env.MONGO_BE_URL}${item.image}`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      );
    if (type === "contain-image-split-grey")
      return (
        <motion.div
          viewport={{ once: true }}
          initial="offscreen"
          whileInView="onscreen"
          variants={productDescriptionVariants}
        >
          {content.map((item: any, index: number) => {
            return (
              <div className="h-fit w-full" key={index}>
                <motion.div className="bg-[#FAFAFA] h-fit w-full my-10 py-4 relative rounded-xl">
                  <div className="h-fit w-full my-4 lg:my-8">
                    <div className="h-fit w-full grid grid-cols-1 lg:grid-cols-2">
                      <CustomText
                        type="paragraph"
                        extraClass="!text-black !text-xl !font-sf_pro_text_light"
                        topClass="w-11/12 lg:w-2/3 mx-auto text-start lg:mt-10"
                      >
                        {renderTitle({ title: title, topClass: "!text-start" })}
                        {!isEmpty(item.semiTitle) && (
                          <CustomText
                            type="paragraph"
                            extraClass="!text-neutral-500 !text-4xl font-semibold"
                            topClass="!text-start"
                          >
                            {item.semiTitle}
                          </CustomText>
                        )}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.text,
                          }}
                        ></div>
                      </CustomText>
                      <div className="h-full w-9/12 mx-auto mt-2 lg:mt-0 lg:w-full flex justify-center items-end">
                        <img
                          className="object-contain object-bottom mx-auto"
                          src={`${process.env.MONGO_BE_URL}${item.image}`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      );
    if (type === "contain-image-grey")
      return (
        <motion.div
          viewport={{ once: true }}
          initial="offscreen"
          whileInView="onscreen"
          variants={productDescriptionVariants}
        >
          {renderTitle({ title: title, topClass: "!text-start" })}
          {content.map((item: any, index: number) => {
            return (
              <div className="h-fit w-full" key={index}>
                <motion.div className="bg-neutral-100 h-fit w-full my-10 py-4 relative rounded-xl">
                  <div className="h-fit w-full my-8">
                    <div className="h-fit w-full">
                      <img
                        className="object-contain mx-auto"
                        src={`${process.env.MONGO_BE_URL}${item.image}`}
                      />
                      <CustomText
                        type="paragraph"
                        extraClass="!text-black !text-xl !font-sf_pro_text_light"
                        topClass="w-2/3 mx-auto text-center mt-10"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.text,
                          }}
                        ></div>
                      </CustomText>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      );
    if (type === "dual-contain-image-grey")
      return (
        <motion.div
          viewport={{ once: true }}
          initial="offscreen"
          whileInView="onscreen"
          variants={productDescriptionVariants}
        >
          {renderTitle({ title: title, topClass: "!text-center" })}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {content.map((item: any, index: number) => {
              return (
                <div className="h-fit w-full" key={index}>
                  <motion.div className="bg-neutral-100 h-fit w-full py-4 relative rounded-xl">
                    <div className="h-fit w-full my-8">
                      <img
                        className="object-contain mx-auto"
                        src={`${process.env.MONGO_BE_URL}${item.image}`}
                      />
                      <div className="h-fit w-full">
                        <CustomText
                          type="paragraph"
                          extraClass="!text-black !text-xl !font-sf_pro_text_light"
                          topClass="w-2/3 mx-auto text-center mt-10"
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.text,
                            }}
                          ></div>
                        </CustomText>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
      );
  };
  return renderItem();
};

export const DescriptionItem = ({
  title,
  content,
  quantity,
  price,
  total,
  type,
}: DescriptionItemModel) => (
  <div className="site-description-item-profile-wrapper mt-2">
    <p className="site-description-item-profile-p-label">
      {type === "description" && `${title}: ${content}`}
      {type === "item_total" &&
        `${quantity} x ${NumberToDollarFormat(price)} = ${NumberToDollarFormat(
          quantity * price
        )}`}
      {type === "cart_total" && `Total: ${NumberToDollarFormat(total)}`}
    </p>
  </div>
);

export const CategoryMacImageCard = ({
  title,
  content,
  textColor,
}: {
  title: string;
  content: {
    text: string;
    image: string;
  }[];
  textColor: string;
}) => {
  return (
    <div className="h-auto px-[0.625em] relative">
      {content.map((item: any) => {
        return (
          <>
            <div className="h-auto w-full flex justify-center items-center">
              <Image
                className="rounded-xl"
                src={`${process.env.MONGO_BE_URL}${item.image}`}
                preview={false}
              />
            </div>
            <div className="h-full w-full p-5 rounded-xl absolute top-0">
              <CustomText
                type="paragraph"
                extraClass={`${textColor} !text-2xl !font-semibold !font-sf_pro`}
                topClass="w-full mx-auto text-start mt-2"
              >
                {title}
              </CustomText>

              <CustomText
                type="paragraph"
                extraClass={`${textColor} !text-3xl !font-bold !font-sf_pro`}
                topClass="w-full mx-auto text-start mt-2"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.text,
                  }}
                ></div>
              </CustomText>
            </div>
          </>
        );
      })}
    </div>
  );
};

export const CategoryAccessoriesImageCard = ({
  title,
  content,
  textColor,
}: {
  title: string;
  content: {
    text: string;
    image: string;
  }[];
  textColor: string;
}) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="h-fit px-[0.625em] relative">
      {content.map((item: any) => {
        return (
          <>
            <div className="h-fit w-full bg-white p-5 rounded-xl shadow">
              <div
                className="h-[26em] lg:h-[28em] w-full bg-contain bg-center bg-no-repeat flex justify-center items-center"
                style={{
                  backgroundImage: `url(${process.env.MONGO_BE_URL}${item.image})`,
                }}
              >
                {/* <Image
                  className="rounded-xl"
                  height={"fit-content"}
                  src={`${process.env.MONGO_BE_URL}${item.image}`}
                  preview={false}
                /> */}
                {showDetail && (
                  <motion.div
                    className="h-full w-11/12 p-5 bg-white rounded-xl absolute top-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="h-auto w-full flex justify-center items-center">
                      <CustomText
                        type="paragraph"
                        extraClass={`${textColor} !text-xl !font-sf_pro`}
                        topClass="w-full mx-auto text-start mt-2"
                      >
                        <span className="font-bold">{title}</span>
                        <div
                          className="mt-4"
                          dangerouslySetInnerHTML={{
                            __html: item.text,
                          }}
                        ></div>
                      </CustomText>
                    </div>
                  </motion.div>
                )}
              </div>
              <div className="h-full w-full p-5 rounded-xl">
                <CustomText
                  type="paragraph"
                  extraClass={`${textColor} !text-xl !font-semibold !font-sf_pro`}
                  topClass="w-full mx-auto text-start mt-2"
                >
                  {title}
                  <Button
                    className="float-right"
                    icon={<PlusCircleOutlined />}
                    onClick={() => {
                      setShowDetail(!showDetail);
                    }}
                  ></Button>
                </CustomText>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
