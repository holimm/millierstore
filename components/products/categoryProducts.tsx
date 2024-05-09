import { ProductDetailType } from "@/models/productDetailModel";
import { ProductsType } from "@/models/productModel";
import { Button, Carousel, Empty, Grid, Spin, Tabs, Typography } from "antd";
import { isEmpty, toLower } from "lodash";
import { RenderProductCard } from "../common";
import {
  NumberToDollarFormat,
  getTotalCarouselSlide,
} from "@/helpers/commonHelpers";
import Link from "next/link";
import { useRef, useState } from "react";
import { CarouselRef } from "antd/es/carousel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

export const CategoryProducts = ({
  title,
  productsList,
  productSeries,
  onChangeProductSeries,
  exploreMore = true,
}: {
  title: string;
  productsList: { data: ProductDetailType; loading: boolean };
  productSeries?: {
    key: string;
    label: React.ReactNode;
  }[];
  onChangeProductSeries?: (activeKey: string) => void;
  exploreMore?: boolean;
}) => {
  const carouselRef = useRef<CarouselRef>();
  const screenSize = useBreakpoint();
  const carouselSlideToShow = getTotalCarouselSlide(screenSize);
  const [currentCarouselSlide, setCurrentCarouselSlide] = useState<number>(0);
  const productListData: ProductsType[] = productsList.data[title];
  const checkProductsExist = !isEmpty(productListData);
  const checkDisableButton = () => {
    if (checkProductsExist) {
      if (carouselSlideToShow > productListData.length) return true;
      if (carouselSlideToShow === productListData.length) return true;
      if (currentCarouselSlide === productListData.length - carouselSlideToShow)
        return true;
    }
  };
  console.log(title, ": ", productListData);

  return (
    <div className="mt-10 lg:mt-20 first:my-0">
      <Typography.Title className="text-center">
        <span className="!font-sf_pro">{title}</span>
      </Typography.Title>
      {!isEmpty(productSeries) && (
        <Tabs
          defaultActiveKey="1"
          items={productSeries}
          onChange={onChangeProductSeries}
        />
      )}
      <Spin spinning={productsList.loading}>
        {checkProductsExist && (
          <>
            <Carousel
              ref={carouselRef}
              slidesToShow={carouselSlideToShow}
              afterChange={(currentSlide: number) =>
                setCurrentCarouselSlide(currentSlide)
              }
              infinite={false}
              waitForAnimate
            >
              {productListData.map((item: ProductsType, index: number) => (
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
                disabled={
                  currentCarouselSlide === 0 || currentCarouselSlide < 0
                }
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
            {exploreMore && (
              <div className="h-fit w-full flex justify-center pb-12">
                <Link href={`/${toLower(title)}`}>
                  <Button type="default" size="large">
                    <span className="font-sf_pro_text_light">Explore more</span>
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
        {!checkProductsExist && <Empty className="mt-20" />}
      </Spin>
    </div>
  );
};
