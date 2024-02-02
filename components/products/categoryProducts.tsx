import { ProductDetailType } from "@/models/productDetailModel";
import { ProductsType } from "@/models/productModel";
import { Button, Empty, Spin, Tabs, Typography } from "antd";
import { isEmpty, toLower } from "lodash";
import { RenderProductCard } from "../common";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import Link from "next/link";

export const CategoryProducts = ({
  title,
  productsList,
  loadingProductList,
  productSeries,
  onChangeProductSeries,
  exploreMore = true,
}: {
  title: string;
  productsList: ProductDetailType;
  loadingProductList: boolean;
  productSeries?: {
    key: string;
    label: React.ReactNode;
  }[];
  onChangeProductSeries?: (activeKey: string) => void;
  exploreMore?: boolean;
}) => {
  const checkExist = !isEmpty(productsList[title]);
  return (
    <div className="mt-20 first:my-0">
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
      <Spin spinning={loadingProductList}>
        {checkExist && (
          <>
            <div className="h-full w-full pb-6 grid grid-cols-4 gap-10">
              {productsList[title].map((item: ProductsType, index: number) => (
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
            {exploreMore && (
              <div className="h-fit w-full flex justify-center">
                <Link href={`/${toLower(title)}`}>
                  <Button type="default" size="large">
                    <span className="font-sf_pro_text_light">Explore more</span>
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
        {!checkExist && <Empty />}
      </Spin>
    </div>
  );
};
