import { RenderProductCard } from "@/components/common";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import { ProductDetailType } from "@/models/productDetailModel";
import { ProductsType } from "@/models/productModel";
import { Carousel, Spin, Typography } from "antd";
import { isEmpty } from "lodash";

export const HomepageFeaturedProducts = ({
  productsList,
}: {
  productsList: {
    data: ProductDetailType;
    loading: any;
  };
}) => {
  const productListData = productsList.data;
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
        <div className="h-fit w-full block lg:hidden my-10">
          <Carousel draggable>
            {!isEmpty(productListData) &&
              productListData["iPhone"].map(
                (item: ProductsType, index: number) => (
                  <div key={index}>
                    <RenderProductCard
                      code={item._id}
                      name={item.name}
                      description={item.description}
                      price={`From ${NumberToDollarFormat(item.lowest_price)}`}
                      srcImage={item.image}
                    />
                  </div>
                )
              )}
          </Carousel>
        </div>
        <div className="h-fit w-full hidden lg:block">
          <div className="h-full w-full py-10 grid grid-cols-4 gap-10">
            {!isEmpty(productListData) &&
              productListData["iPhone"].map(
                (item: ProductsType, index: number) => (
                  <div key={index}>
                    <RenderProductCard
                      code={item._id}
                      name={item.name}
                      description={item.description}
                      price={`From ${NumberToDollarFormat(item.lowest_price)}`}
                      srcImage={item.image}
                    />
                  </div>
                )
              )}
          </div>
        </div>
      </Spin>
    </>
  );
};
