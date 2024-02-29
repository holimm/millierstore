import { Empty, Spin, Typography } from "antd";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProductsSearch } from "@/redux/entities/products";
import { getProductsSearch } from "@/redux/selectors/products";
import { useRouter } from "next/router";
import { RenderProductCard } from "@/components/common";

export default function Search() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const productsList = useAppSelector(getProductsSearch);

  useEffect(() => {
    if (!isEmpty(router.query.code)) {
      dispatch(
        fetchProductsSearch({ params: { name: router.query.code.toString() } })
      );
    }
  }, [router.query.code]);

  const checkExist = !isEmpty(productsList.data);

  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full">
        <div className="h-fit w-3/4 mx-auto py-20">
          <div className="my-20 first:my-0">
            <Typography.Title className="text-center">
              <span className="!font-sf_pro">
                {productsList.data.length} results found
              </span>
            </Typography.Title>
            <Spin spinning={productsList.loading}>
              {checkExist && (
                <>
                  <div className="h-full w-full pb-6 grid grid-cols-4 gap-10">
                    {productsList.data.map((item: any, index: number) => (
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
                    ))}
                  </div>
                </>
              )}
              {!checkExist && <Empty className="mt-20" />}
            </Spin>
          </div>
        </div>
      </div>
    </main>
  );
}
