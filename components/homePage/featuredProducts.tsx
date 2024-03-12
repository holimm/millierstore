import { RenderProductCard } from "@/components/common";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import { ProductDetailType } from "@/models/productDetailModel";
import { ProductsType } from "@/models/productModel";
import { Spin, Typography } from "antd";
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
      <Typography.Title className="text-center">
        <span className="!font-sf_pro">Featured Products</span>
      </Typography.Title>
      <Typography.Paragraph className="text-center text-lg">
        <span className="!font-sf_pro_text_light">
          Discover our latest collection of high-quality products
        </span>
      </Typography.Paragraph>
      <Spin spinning={productsList.loading}>
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
      </Spin>
    </>
  );
};
