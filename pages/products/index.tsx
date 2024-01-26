import { Button, Card, Empty, Image, Spin, Typography } from "antd";
import { isEmpty, omit } from "lodash";
import { CustomText } from "@/components/homePage/common";
import { useEffect } from "react";
import NumberToDollarFormat from "@/helpers/commonHelpers";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCategory, fetchProducts } from "@/redux/entities/products";
import {
  getCategory,
  getProducts,
  getProductsLoading,
} from "@/redux/selectors/products";
import { CategoryType, ProductsType } from "@/models/productModel";
import { RenderProductCard } from "@/components/common";

export default function Home() {
  const dispatch = useAppDispatch();
  const productsList = useAppSelector(getProducts);
  const loadingProductList = useAppSelector(getProductsLoading);
  const categoryList = useAppSelector(getCategory);

  useEffect(() => {
    dispatch(fetchProducts({}));
    dispatch(fetchCategory());
  }, []);

  const renderCategoryProducts = ({ title }: { title: string }) => {
    const checkExist = !isEmpty(productsList[title]);
    return (
      <div className="my-20 first:my-0">
        <Typography.Title className="text-center">
          <span className="!font-sf_pro">{title}</span>
        </Typography.Title>
        <Spin spinning={loadingProductList}>
          {checkExist && (
            <>
              <div className="h-full w-full pb-6 grid grid-cols-4 gap-10">
                {productsList[title].map(
                  (item: ProductsType, index: number) => (
                    <div key={index}>
                      <RenderProductCard
                        code={item._id}
                        name={item.name}
                        description={item.description}
                        price={`From ${NumberToDollarFormat(
                          item.lowest_price
                        )}`}
                        srcImage={item.image}
                      />
                    </div>
                  )
                )}
              </div>
              <div className="h-fit w-full flex justify-center">
                <Button type="default" size="large">
                  <span className="font-sf_pro_text_light">Explore more</span>
                </Button>
              </div>
            </>
          )}
          {!checkExist && <Empty />}
        </Spin>
      </div>
    );
  };

  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full">
        <div className="h-fit w-3/4 mx-auto py-20">
          {categoryList.map((item: CategoryType) =>
            renderCategoryProducts({ title: item.name })
          )}
        </div>
      </div>
    </main>
  );
}
