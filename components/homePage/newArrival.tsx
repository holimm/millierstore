import { RenderProductCard } from "@/components/common";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import { ProductDetailType } from "@/models/productDetailModel";
import { ProductsType } from "@/models/productModel";
import { Typography } from "antd";
import { isEmpty } from "lodash";

export const HomepageNewArrival = ({
  productListData,
}: {
  productListData: ProductDetailType;
}) => {
  return (
    <>
      <Typography.Title className="text-center">
        <span className="!font-sf_pro">New Arrival</span>
      </Typography.Title>
      <Typography.Paragraph className="text-center text-lg">
        <span className="!font-sf_pro_text_light">
          Introducing our latest collection
        </span>
      </Typography.Paragraph>
      <div className="h-full w-full py-10 grid grid-cols-4 gap-10">
        {!isEmpty(productListData) &&
          productListData["iPhone"].map((item: ProductsType, index: number) => (
            <div key={index}>
              <RenderProductCard
                code={item._id}
                name={item.name}
                description={item.description}
                price={`From ${NumberToDollarFormat(item.lowest_price)}`}
                srcImage={item.image}
              />
            </div>
          ))}
      </div>
    </>
  );
};
