import { motion } from "framer-motion";
import { CustomText } from "@/components/homePage/common";
import {
  productDescriptionImageVariants,
  productDescriptionVariants,
} from "@/models/productDetailModel";
import { renderTitle } from "../common";

export default function DescriptionTabItem({
  type,
  title,
  content,
}: {
  type:
    | "text"
    | "dual-images"
    | "contain-image"
    | "dual-contain-image"
    | "contain-image-bottom-white"
    | "contain-image-white"
    | "dual-contain-image-white"
    | "contain-image-grey"
    | "dual-contain-image-grey";
  title: string;
  content: {
    text: string;
    image: string;
  }[];
}) {
  const renderItem = () => {
    if (type === "text")
      return (
        <motion.div
          viewport={{ once: true }}
          initial="offscreen"
          whileInView="onscreen"
          variants={productDescriptionVariants}
        >
          {renderTitle({ title: title, topClass: "!text-center mt-10" })}
          {content.map((item: any, index: any) => (
            <div key={index}>
              {item.image === "null" && (
                <CustomText
                  type="paragraph"
                  extraClass="!text-black !text-lg !font-sf_pro_text_light"
                  topClass="!text-center"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.text,
                    }}
                  ></div>
                </CustomText>
              )}
            </div>
          ))}
        </motion.div>
      );
    if (type === "dual-images")
      return (
        <motion.div
          viewport={{ once: true }}
          initial="offscreen"
          whileInView="onscreen"
          variants={productDescriptionVariants}
        >
          {renderTitle({ title: title, topClass: "!text-center mt-10" })}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {content.map((item: any, index: number) => (
              <div key={index} className="h-fit w-full">
                <motion.div
                  className="bg-black h-[26em] lg:h-[35em] w-full my-10 bg-cover bg-center bg-no-repeat rounded-xl"
                  style={{
                    backgroundImage: `url(${process.env.MONGO_BE_URL}${item.image})`,
                  }}
                  viewport={{ once: true }}
                  initial="offscreen"
                  whileInView="onscreen"
                  variants={productDescriptionImageVariants}
                ></motion.div>
                <CustomText
                  type="paragraph"
                  extraClass="!text-black !text-lg"
                  topClass="w-full"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.text,
                    }}
                  ></div>
                </CustomText>
              </div>
            ))}
          </div>
        </motion.div>
      );
    if (type === "contain-image")
      return (
        <motion.div
          viewport={{ once: true }}
          initial="offscreen"
          whileInView="onscreen"
          variants={productDescriptionVariants}
        >
          {renderTitle({ title: title, topClass: "!text-center mt-10" })}
          {content.map((item: any, index: number) => (
            <div key={index} className="h-fit w-full">
              <motion.div className="bg-black h-fit w-full my-10 py-2 lg:py-4 relative rounded-xl">
                <div className="h-fit w-full my-8">
                  <div className="h-fit w-full">
                    <CustomText
                      type="paragraph"
                      extraClass="!text-white !text-2xl"
                      topClass="w-full text-center"
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.text,
                        }}
                      ></div>
                    </CustomText>
                  </div>
                  <img
                    className="object-contain mx-auto mt-10"
                    src={`${process.env.MONGO_BE_URL}${item.image}`}
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      );
    if (type === "dual-contain-image")
      return (
        <motion.div
          viewport={{ once: true }}
          initial="offscreen"
          whileInView="onscreen"
          variants={productDescriptionVariants}
        >
          {renderTitle({ title: title, topClass: "!text-center mt-10" })}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {content.map((item: any, index: number) => (
              <div key={index} className="h-fit w-full">
                <motion.div className="bg-black h-fit w-full py-4 relative rounded-xl">
                  <div className="h-fit w-full my-8">
                    <div className="h-fit w-full">
                      <CustomText
                        type="paragraph"
                        extraClass="!text-white !text-2xl"
                        topClass="w-full text-center"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.text,
                          }}
                        ></div>
                      </CustomText>
                    </div>
                    <img
                      className="object-contain mx-auto mt-10"
                      src={`${process.env.MONGO_BE_URL}${item.image}`}
                    />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      );
    if (type === "contain-image-white")
      return (
        <motion.div
          viewport={{ once: true }}
          initial="offscreen"
          whileInView="onscreen"
          variants={productDescriptionVariants}
        >
          {renderTitle({ title: title, topClass: "!text-center mt-10" })}
          {content.map((item: any, index: number) => (
            <div key={index} className="h-fit w-full">
              <motion.div className="bg-neutral-100 h-fit w-full my-10 py-4 relative rounded-xl">
                <div className="h-fit w-full my-8">
                  <div className="h-fit w-full">
                    <CustomText
                      type="paragraph"
                      extraClass="!text-black !text-2xl"
                      topClass="w-full text-center"
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.text,
                        }}
                      ></div>
                    </CustomText>
                  </div>
                  <img
                    className="object-contain mx-auto mt-10"
                    src={`${process.env.MONGO_BE_URL}${item.image}`}
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      );
    if (type === "contain-image-bottom-white")
      return (
        <motion.div
          viewport={{ once: true }}
          initial="offscreen"
          whileInView="onscreen"
          variants={productDescriptionVariants}
        >
          {renderTitle({ title: title, topClass: "!text-center mt-10" })}
          {content.map((item: any, index: number) => (
            <div key={index} className="h-fit w-full">
              <motion.div className="bg-neutral-100 h-fit w-full my-10 pt-4 relative rounded-xl">
                <div className="h-fit w-full my-8">
                  <div className="h-fit w-full">
                    <CustomText
                      type="paragraph"
                      extraClass="!text-black !text-2xl"
                      topClass="w-full text-center"
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.text,
                        }}
                      ></div>
                    </CustomText>
                  </div>
                  <img
                    className="object-contain mx-auto mt-10"
                    src={`${process.env.MONGO_BE_URL}${item.image}`}
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      );
    if (type === "dual-contain-image-white")
      return (
        <motion.div
          viewport={{ once: true }}
          initial="offscreen"
          whileInView="onscreen"
          variants={productDescriptionVariants}
        >
          {renderTitle({ title: title, topClass: "!text-center mt-10" })}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {content.map((item: any, index: number) => (
              <div key={index} className="h-fit w-full">
                <motion.div className="bg-neutral-100 h-fit w-full py-4 relative rounded-xl">
                  <div className="h-fit w-full my-8">
                    <div className="h-fit w-full">
                      <CustomText
                        type="paragraph"
                        extraClass="!text-black !text-2xl"
                        topClass="w-full text-center"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.text,
                          }}
                        ></div>
                      </CustomText>
                    </div>
                    <img
                      className="object-contain mx-auto mt-10"
                      src={`${process.env.MONGO_BE_URL}${item.image}`}
                    />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
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
          {renderTitle({ title: title, topClass: "!text-center mt-10" })}
          {content.map((item: any, index: number) => (
            <div key={index} className="h-fit w-full">
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
          ))}
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
          {renderTitle({ title: title, topClass: "!text-center mt-10" })}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 mb-2 lg:mt-10 lg:mb-10">
            {content.map((item: any, index: number) => (
              <div key={index} className="h-fit w-full">
                <motion.div className="bg-neutral-100 h-fit w-full mt-4 lg:mt-0 py-4 relative rounded-xl">
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
            ))}
          </div>
        </motion.div>
      );
  };
  return renderItem();
}
