import { Carousel, Col, Flex, Image, Row, Spin } from "antd";
import { CustomText } from "@/components/homePage/common";
import {
  ProductColorType,
  ProductDetailType,
} from "@/models/productDetailModel";
import NumberToDollarFormat from "@/helpers/commonHelpers";

export default function ProductMain({
  productDetail,
  checkProductExist,
  checkColorExist,
  productDetailLoading,
  productCode,
  productColor,
  onChangeProductColor,
}: {
  productDetail: ProductDetailType;
  checkProductExist: boolean;
  checkColorExist: boolean;
  productDetailLoading: boolean;
  productCode: string;
  productColor: ProductColorType;
  onChangeProductColor: Function;
}) {
  return (
    <Row gutter={30}>
      <Col span={18}>
        <div className="!sticky top-28">
          <Spin spinning={productDetailLoading}>
            <CustomText
              type="paragraph"
              extraClass="!text-black !text-3xl !font-bold"
            >
              {checkProductExist && productDetail[productCode].name}
            </CustomText>
            <Carousel className=" cursor-pointer" draggable autoplay infinite>
              {checkProductExist &&
                checkColorExist &&
                productDetail[productCode].images[productColor.lowercase].map(
                  (item, index) => (
                    <Image
                      key={index}
                      src={`${process.env.MONGO_BE_URL + item}`}
                      preview={false}
                    ></Image>
                  )
                )}
            </Carousel>
            <p className="w-full mt-2 text-center">&larr; Draggable &rarr;</p>
          </Spin>
        </div>
      </Col>
      <Col span={6}>
        <Flex className="h-full w-full" justify="center" align="center">
          <div className="h-fit w-fit">
            <div className="my-12">
              <CustomText
                type="paragraph"
                extraClass="!text-black !text-3xl font-semibold"
              >
                Finish.{" "}
                <span className="text-neutral-500">Pick your favorite</span>
              </CustomText>
              <CustomText type="paragraph" extraClass="!text-black !text-2xl">
                Color - {productColor.label}
              </CustomText>
              <Spin spinning={productDetailLoading}>
                <div className="h-fit w-full flex justify-start gap-10">
                  {checkProductExist &&
                    productDetail[productCode].colors.map((item: any) => (
                      <div
                        className={`h-8 w-8 rounded-full cursor-pointer border-2 ${
                          productColor.lowercase === item.lowercase &&
                          "border-blue-400"
                        } shadow-md transition-all duration-500`}
                        style={{ backgroundColor: item.color }}
                        onClick={() => onChangeProductColor(item)}
                      ></div>
                    ))}
                </div>
              </Spin>
            </div>
            <div className="my-20">
              <CustomText
                type="paragraph"
                extraClass="!text-black !text-3xl font-semibold"
              >
                Storage.{" "}
                <span className="text-neutral-500">
                  How much space do you need?
                </span>
              </CustomText>
              <Spin spinning={productDetailLoading}>
                <div className="h-fit w-full flex-rows justify-start gap-10">
                  {checkProductExist &&
                    productDetail[productCode].storage.map((item: any) => (
                      <div className="h-fit w-full my-5 grid grid-cols-2 border-[1px] border-neutral-600/50 rounded-xl cursor-pointer">
                        <div className="h-full w-full flex items-center px-5">
                          <CustomText
                            type="paragraph"
                            extraClass="!text-black !text-lg font-semibold"
                          >
                            {item.capacity}
                            <span className="!text-md">{item.unit}</span>
                          </CustomText>
                        </div>
                        <div className="h-full w-full flex items-center px-5">
                          <CustomText
                            type="paragraph"
                            extraClass="!text-black !text-md"
                            topClass="mt-3"
                          >
                            From {NumberToDollarFormat(item.price)}
                            &nbsp;or {NumberToDollarFormat(item.price / 24)}
                            /month for 24 mo.
                          </CustomText>
                        </div>
                      </div>
                    ))}
                </div>
              </Spin>
            </div>
          </div>
        </Flex>
      </Col>
    </Row>
  );
}
