import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Typography } from "antd";
import { isEmpty, toLower } from "lodash";
import Link from "next/link";

export const CustomText = ({
  children,
  type,
  level,
  extraClass,
  topClass,
}: {
  children: ReactNode;
  type: "paragraph" | "title";
  level?: number;
  extraClass?: string;
  topClass?: string;
}) => {
  const renderText = () => {
    if (type === "paragraph")
      return (
        <Typography.Paragraph className={`${topClass && topClass}`}>
          <span
            className={`text-white !font-sf_pro !mt-10 ${
              !isEmpty(extraClass) && extraClass
            }`}
          >
            {children}
          </span>
        </Typography.Paragraph>
      );
    if (type === "title")
      return (
        <Typography.Title level={2} className={`${topClass && topClass}`}>
          <span className="!font-sf_pro">{children}</span>
        </Typography.Title>
      );
  };
  return renderText();
};

export const CustomButton = ({
  children,
  extraClass,
}: {
  children: ReactNode;
  extraClass?: string;
}) => {
  return (
    <div
      className={`h-full w-full flex justify-center items-center mt-2 ${
        !isEmpty(extraClass) && extraClass
      }`}
    >
      <button className="text-black !font-sf_pro bg-gradient-to-r from-slate-100 to-white px-5 py-2 mx-auto hover:text-black hover:scale-[1.025] transition-all duration-500 rounded-lg shadow">
        {children}
      </button>
    </div>
  );
};

export const CategoryCard = ({
  label,
  src,
}: {
  label: string;
  src: string;
}) => {
  return (
    <Link href={`/${toLower(label)}`}>
      <motion.div
        className="h-[34em] w-full rounded-xl aspect-[9/16] bg-cover bg-center bg-no-repeat shadow-lg cursor-pointer"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "100%",
        }}
        whileHover={{ backgroundSize: "105%" }}
        transition={{ ease: "easeInOut" }}
      >
        <div className="h-full w-full group hover:bg-black/40 hover:backdrop-blur-sm transition-all duration-500 rounded-xl">
          <div className="h-full w-full opacity-0 group-hover:opacity-100 transition-all duration-700">
            <div className="h-full w-full flex justify-center items-center">
              <CustomText type="paragraph" extraClass="!text-4xl">
                {label}
              </CustomText>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
