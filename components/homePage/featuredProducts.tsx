import { RenderProductCard } from "@/components/common";
import {
  NumberToDollarFormat,
  getTotalCarouselSlide,
} from "@/helpers/commonHelpers";
import { ProductDetailType } from "@/models/productDetailModel";
import { ProductsType } from "@/models/productModel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Carousel, Grid, Spin, Typography } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { isEmpty } from "lodash";
import { useRef, useState } from "react";

const { useBreakpoint } = Grid;

export const HomepageFeaturedProducts = ({
  productsList,
}: {
  productsList: {
    data: ProductDetailType;
    loading: any;
  };
}) => {
  const carouselRef = useRef<CarouselRef>();
  const screenSize = useBreakpoint();
  const carouselSlideToShow = getTotalCarouselSlide(screenSize);
  const [currentCarouselSlide, setCurrentCarouselSlide] = useState<number>(0);
  const productListData: ProductsType[] = productsList.data["iPhone"];
  const checkProductsExist = !isEmpty(productListData);
  const checkDisableButton = () => {
    if (checkProductsExist) {
      if (carouselSlideToShow === productListData.length) return true;
      if (currentCarouselSlide === productListData.length - carouselSlideToShow)
        return true;
    }
  };

  return (
    <>
      <Typography.Paragraph className="text-center text-3xl lg:text-4xl font-semibold">
        <span className="!font-sf_pro">Featured Products</span>
      </Typography.Paragraph>
      <Typography.Paragraph className="text-center text-lg">
        <span className="!font-sf_pro_text_light">
          Discover our latest collection of high-quality products
        </span>
      </Typography.Paragraph>
      <Spin spinning={productsList.loading}>
        <div className="h-fit w-full my-10">
          <Carousel
            ref={carouselRef}
            slidesToShow={checkProductsExist && carouselSlideToShow}
            afterChange={(currentSlide: number) =>
              setCurrentCarouselSlide(currentSlide)
            }
            infinite={false}
            waitForAnimate
          >
            {checkProductsExist &&
              productListData.map((item: ProductsType, index: number) => (
                <>
                  <div key={index}>
                    <RenderProductCard
                      code={item._id}
                      name={item.name}
                      description={item.description}
                      price={`From ${NumberToDollarFormat(item.lowest_price)}`}
                      srcImage={item.image}
                    />
                  </div>
                </>
              ))}
          </Carousel>
          <div className="flex gap-5 justify-end h-fit w-full">
            <Button
              type="text"
              size="large"
              onClick={() => {
                carouselRef.current.prev();
              }}
              disabled={currentCarouselSlide === 0 || currentCarouselSlide < 0}
              icon={<LeftOutlined />}
            ></Button>
            <Button
              type="text"
              size="large"
              onClick={() => {
                carouselRef.current.next();
              }}
              disabled={checkDisableButton()}
              icon={<RightOutlined />}
            ></Button>
          </div>
        </div>
      </Spin>
    </>
  );
};
