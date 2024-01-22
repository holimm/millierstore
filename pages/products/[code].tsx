import { Carousel, Col, Flex, Image, Row } from "antd";
import productDetailService from "@/services/productDetailService";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { fetchProductDetailById } from "@/redux/entities/productsDetail";
import { useRouter } from "next/router";
import { getProductDetail } from "@/redux/selectors/products";
import { isEmpty, toString } from "lodash";
import { CustomText } from "@/components/homePage/common";
import { ProductDetailType } from "@/models/productDetailModel";
import NumberToDollarFormat from "@/helpers/commonHelpers";

interface PhoneColorType {
  label?: string;
  lowercase?: string;
}

export default function ProductDetailsPage() {
  const router = useRouter();
  const productCode: string = toString(router.query.code);
  const dispatch = useAppDispatch();
  const [phoneColor, setPhoneColor] = useState<PhoneColorType>({});
  useEffect(() => {
    if (!isEmpty(productCode)) dispatch(fetchProductDetailById(productCode));
  }, [productCode]);
  const productDetail = useAppSelector(getProductDetail);
  useEffect(() => {
    if (!isEmpty(productDetail[productCode]))
      setPhoneColor(productDetail[productCode].colors[0]);
  }, [productDetail]);

  console.log("Product Detail: ", productDetail, !isEmpty(productDetail));

  const onChangePhoneColor = (color: PhoneColorType) => {
    setPhoneColor(color);
  };
  return (
    <main className={`h-fit w-full`}>
      <div className="h-full w-full flex justify-center items-center">
        <div className="h-full w-3/4 py-16">
          <Row gutter={30}>
            <Col span={18}>
              <div className="!sticky top-20">
                <Carousel autoplay infinite>
                  <Image
                    src="http://localhost:3030/images/iphone15promax/details/naturaltitanium/front.jpg"
                    preview={false}
                  ></Image>
                  <Image
                    src="http://localhost:3030/images/iphone15promax/details/naturaltitanium/back.jpg"
                    preview={false}
                  ></Image>
                  <Image
                    src="http://localhost:3030/images/iphone15promax/details/naturaltitanium/side.jpg"
                    preview={false}
                  ></Image>
                  <Image
                    src="http://localhost:3030/images/iphone15promax/details/naturaltitanium/camera.jpg"
                    preview={false}
                  ></Image>
                </Carousel>
              </div>
            </Col>
            <Col span={6}>
              <Flex className="h-full w-full" justify="center" align="center">
                <div className="h-fit w-fit">
                  <div>
                    <CustomText
                      type="paragraph"
                      extraClass="!text-black !text-3xl font-semibold"
                    >
                      Finish.{" "}
                      <span className="text-neutral-500">
                        Pick your favorite
                      </span>
                    </CustomText>
                    <CustomText
                      type="paragraph"
                      extraClass="!text-black !text-2xl"
                    >
                      Color - {phoneColor.label}
                    </CustomText>
                    <div className="h-fit w-full flex justify-start gap-10">
                      {!isEmpty(productDetail[productCode]) &&
                        productDetail[productCode].colors.map((item: any) => (
                          <div
                            className="h-8 w-8 bg-neutral-500 rounded-full cursor-pointer"
                            onClick={() => onChangePhoneColor(item)}
                          >
                            {item.label}
                          </div>
                        ))}
                    </div>
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
                    <div className="h-fit w-full flex-rows justify-start gap-10">
                      {!isEmpty(productDetail[productCode]) &&
                        productDetail[productCode].storage.map((item: any) => (
                          <div className="h-fit w-full py-5 my-5 grid grid-cols-2 border-2 rounded-xl cursor-pointer">
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
                              >
                                From {NumberToDollarFormat(item.price)}
                                or {NumberToDollarFormat(item.price / 24)}/month
                                for 24 mo.
                              </CustomText>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </Flex>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  );
}
