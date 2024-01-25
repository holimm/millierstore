import { motion } from "framer-motion";
import { CustomText } from "@/components/homePage/common";
import {
  productDescriptionImageVariants,
  productDescriptionVariants,
} from "@/models/productDetailModel";

const renderTitle = (title: string) => {
  return (
    <>
      {title !== "null" && (
        <CustomText
          type="paragraph"
          extraClass="!text-black !text-3xl font-semibold"
          topClass="!text-center mt-10"
        >
          {title}
        </CustomText>
      )}
    </>
  );
};

export default function DescriptionTabItem({
  type,
  title,
  content,
}: {
  type: string;
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
          {renderTitle(title)}
          {content.map((item: any) => (
            <>
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
            </>
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
          {renderTitle(title)}
          <div className="grid grid-cols-2 gap-5">
            {content.map((item: any) => {
              return (
                <div className="h-fit w-full">
                  <motion.div
                    className="bg-black h-[35em] w-full my-10 bg-cover bg-center bg-no-repeat rounded-xl"
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
              );
            })}
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
          {renderTitle(title)}
          {content.map((item: any) => {
            return (
              <div className="h-fit w-full">
                <motion.div className="bg-black h-fit w-full my-10 py-4 relative rounded-xl">
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
            );
          })}
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
          {renderTitle(title)}
          <div className="grid grid-cols-2 gap-5">
            {content.map((item: any) => {
              return (
                <div className="h-fit w-full">
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
              );
            })}
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
          {renderTitle(title)}
          {content.map((item: any) => {
            return (
              <div className="h-fit w-full">
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
          {renderTitle(title)}
          <div className="grid grid-cols-2 gap-5">
            {content.map((item: any) => {
              return (
                <div className="h-fit w-full">
                  <motion.div className="bg-neutral-100 h-fit w-full my-10 py-4 relative rounded-xl">
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
}
