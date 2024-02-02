import { Button, Card, Empty, Image, Spin, Typography } from "antd";
import { isEmpty, omit } from "lodash";
import { CustomText } from "@/components/homePage/common";
import { useEffect } from "react";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
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
import { CategoryProducts } from "@/components/products/categoryProducts";

export default function Home() {
  const dispatch = useAppDispatch();
  const productsList = useAppSelector(getProducts);
  const loadingProductList = useAppSelector(getProductsLoading);
  const categoryList = useAppSelector(getCategory);

  useEffect(() => {
    dispatch(fetchProducts({}));
    dispatch(fetchCategory());
  }, []);
  console.log(productsList);

  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full">
        <div className="h-fit w-3/4 mx-auto py-20">
          {categoryList.map((item: CategoryType) => (
            <CategoryProducts
              title={item.name}
              productsList={productsList}
              loadingProductList={loadingProductList}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
