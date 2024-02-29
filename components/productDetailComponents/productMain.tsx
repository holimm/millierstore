import {
  Button,
  Carousel,
  Col,
  Collapse,
  Divider,
  Flex,
  Image,
  Row,
  Spin,
} from "antd";
import { motion } from "framer-motion";
import { CustomText } from "@/components/homePage/common";
import {
  ProductColorType,
  ProductDetailType,
  ProductStorageType,
} from "@/models/productDetailModel";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import { saveCart } from "@/redux/entities/cart";
import { CartType } from "@/models/cartModel";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCart } from "@/redux/selectors/cart";

export default function ProductMain({
  productDetail,
  checkProductExist,
  checkColorExist,
  productCode,
  productColor,
  productStorage,
  openAddToCart,
  onChangeProductColor,
  onChangeProductStorage,
}: {
  productDetail: { data: ProductDetailType; loading: boolean };
  checkProductExist: boolean;
  checkColorExist: boolean;
  productCode: string;
  productColor: ProductColorType;
  productStorage: ProductStorageType;
  openAddToCart: string[] | [];
  onChangeProductColor: Function;
  onChangeProductStorage: Function;
}) {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector(getCart);
  const handleAddToCart = (data: CartType) => {
    dispatch(saveCart(data));
  };
  const productDetailData = productDetail.data;

  console.log(productDetailData);
  return (
    <Row gutter={30}>
      <Col span={18}>
        <div className="!sticky top-28">
          <Spin spinning={productDetail.loading}>
            <CustomText
              type="paragraph"
              extraClass="!text-black !text-3xl !font-bold"
            >
              {checkProductExist && productDetailData[productCode].name}
            </CustomText>
            <Carousel className=" cursor-pointer" draggable autoplay infinite>
              {checkProductExist &&
                checkColorExist &&
                productDetailData[productCode].images[
                  productColor.lowercase
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Image
                      key={index}
                      src={`${process.env.MONGO_BE_URL + item}`}
                      preview={false}
                    ></Image>
                  </motion.div>
                ))}
            </Carousel>
            <p className="w-full mt-2 text-center text-black">
              &larr; Draggable &rarr;
            </p>
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
                Finish.&nbsp;
                <span className="text-neutral-500">Pick your favorite</span>
              </CustomText>
              <CustomText type="paragraph" extraClass="!text-black !text-2xl">
                Color - {productColor.label}
              </CustomText>
              <Spin spinning={productDetail.loading}>
                <div className="h-fit w-full flex justify-start gap-10">
                  {checkProductExist &&
                    productDetailData[productCode].colors.map(
                      (item: any, index: number) => (
                        <div
                          key={index}
                          className={`h-8 w-8 rounded-full cursor-pointer border-2 ${
                            productColor.lowercase === item.lowercase &&
                            "border-blue-400"
                          } shadow-md transition-all duration-500`}
                          style={{ backgroundColor: item.color }}
                          onClick={() => onChangeProductColor(item)}
                        ></div>
                      )
                    )}
                </div>
              </Spin>
            </div>
            <div className="my-14">
              <CustomText
                type="paragraph"
                extraClass="!text-black !text-3xl font-semibold"
              >
                Storage.&nbsp;
                <span className="text-neutral-500">
                  How much space do you need?
                </span>
              </CustomText>
              <Spin spinning={productDetail.loading}>
                <div className="h-fit w-full flex-rows justify-start gap-10">
                  {checkProductExist &&
                    productDetailData[productCode].storage.map(
                      (item: ProductStorageType, index: number) => (
                        <div
                          key={index}
                          className={`h-fit w-full my-5 grid grid-cols-2 border-[1px] border-neutral-600/50 ${
                            productStorage.capacity === item.capacity &&
                            "!border-blue-400"
                          } rounded-xl cursor-pointer transition-all duration-500`}
                          onClick={() => onChangeProductStorage(item)}
                        >
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
                      )
                    )}
                </div>
              </Spin>
            </div>
            <div className="my-14">
              <Collapse
                className="w-full !p-0"
                collapsible="header"
                activeKey={openAddToCart}
                items={[
                  {
                    key: "1",
                    label: "",
                    children: (
                      <div className="w-full">
                        <CustomText
                          type="paragraph"
                          extraClass="!text-black !text-3xl font-semibold"
                        >
                          Proceed.
                        </CustomText>
                        <CustomText
                          type="paragraph"
                          extraClass="!text-black !text-lg"
                        >
                          {`${
                            checkProductExist &&
                            productDetailData[productCode].name
                          }`}
                          <br />
                          {`${productColor.label}`}
                          <br />
                          {`${productStorage.capacity} ${productStorage.unit}`}
                          <Divider />
                          <b>{`${NumberToDollarFormat(
                            productStorage.price
                          )}`}</b>
                        </CustomText>
                        <Button
                          className="w-full my-4"
                          type="default"
                          size="large"
                          onClick={() => {
                            handleAddToCart({
                              name: productDetailData[productCode].name,
                              storage: productStorage,
                              color: productColor,
                              quantity: 1,
                            });
                          }}
                        >
                          Add To Cart
                        </Button>
                      </div>
                      // <div className="h-fit w-full bg-slate-600">
                      //   <motion.div className="bg-neutral-100 h-fit w-full relative rounded-xl">
                      //     <div className="h-fit w-full my-8">
                      //       <div className="h-fit w-full flex justify-start items-end px-40 pt-20">
                      //         <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-whitetitanium-select_AV2?wid=362&hei=244&fmt=p-jpg&qlt=95&.v=1693080287014" />
                      //       </div>
                      //     </div>
                      //   </motion.div>
                      // </div>
                    ),
                    showArrow: false,
                  },
                ]}
                ghost
              />
            </div>
          </div>
        </Flex>
      </Col>
    </Row>
  );
}
