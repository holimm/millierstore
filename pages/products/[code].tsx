import { Button, Collapse, Radio, RadioChangeEvent, Spin } from "antd";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useMemo, useState } from "react";
import { fetchProductDetailById } from "@/redux/entities/productsDetail";
import { useRouter } from "next/router";
import {
  getProductDetail,
  getProductDetailLoading,
} from "@/redux/selectors/products";
import { isEmpty, toString } from "lodash";
import {
  ProductColorType,
  ProductStorageType,
} from "@/models/productDetailModel";
import DescriptionTabItem from "@/components/productDetailComponents/descriptionTab";
import SpecificationTab from "@/components/productDetailComponents/specificationTab";
import ProductMain from "@/components/productDetailComponents/productMain";

export default function ProductDetailsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const productCode: string = toString(router.query.code);
  const [productColor, setProductColor] = useState<ProductColorType>({});
  const [productStorage, setProductStorage] = useState<ProductStorageType>({});
  const [descriptionTab, setDescriptionTab] = useState<string>("overview");
  const [openAddToCart, setOpenAddToCart] = useState<string[] | []>([]);

  useEffect(() => {
    if (!isEmpty(productCode)) dispatch(fetchProductDetailById(productCode));
  }, [productCode]);

  const productDetail = useAppSelector(getProductDetail);
  const productDetailLoading = useAppSelector(getProductDetailLoading);

  useEffect(() => {
    if (!isEmpty(productDetail[productCode]))
      setProductColor(productDetail[productCode].colors[0]);
  }, [productDetail]);

  useEffect(() => {
    if (!isEmpty(productColor) && !isEmpty(productStorage))
      setOpenAddToCart(["1"]);
    else setOpenAddToCart([]);
  }, [productColor, productStorage]);

  const checkProductExist = useMemo(() => {
    setProductColor(
      !isEmpty(productDetail[productCode]) &&
        productDetail[productCode].colors[0]
    );
    return !isEmpty(productDetail[productCode]);
  }, [productDetail]);

  const checkColorExist = useMemo(() => {
    return !isEmpty(productColor);
  }, [productColor]);

  const onChangeProductColor = (color: ProductColorType) => {
    setProductColor(color);
  };

  const onChangeProductStorage = (storage: ProductStorageType) => {
    setProductStorage(storage);
  };

  const onChangeDescriptionTab = (e: RadioChangeEvent) => {
    setDescriptionTab(e.target.value);
  };

  // console.log("Product List: ", productDetail);
  // console.log("Product Color: ", productColor);
  // console.log("Product Storage: ", productStorage);

  return (
    <main className={`h-fit w-full`}>
      <div className="h-full w-full flex justify-center items-center">
        <div className="h-fit w-3/4 py-16">
          <ProductMain
            productDetail={productDetail}
            checkProductExist={checkProductExist}
            checkColorExist={checkColorExist}
            productDetailLoading={productDetailLoading}
            productCode={productCode}
            productColor={productColor}
            productStorage={productStorage}
            openAddToCart={openAddToCart}
            onChangeProductColor={onChangeProductColor}
            onChangeProductStorage={onChangeProductStorage}
          />

          <div className="h-fit w-3/4 mx-auto my-20">
            <Radio.Group
              className="flex justify-center"
              size="large"
              value={descriptionTab}
              onChange={onChangeDescriptionTab}
              style={{ marginBottom: 16 }}
            >
              <Radio.Button value="overview">Overview</Radio.Button>
              <Radio.Button value="specifications">Specifications</Radio.Button>
            </Radio.Group>
            <div className="h-fit w-full mx-auto my-10">
              {descriptionTab === "overview" && (
                <Spin spinning={productDetailLoading}>
                  {checkProductExist &&
                    productDetail[productCode].description.map((item) => (
                      <>
                        <DescriptionTabItem
                          type={item.type}
                          title={item.label}
                          content={item.content}
                        />
                      </>
                    ))}
                </Spin>
              )}
              {descriptionTab === "specifications" && (
                <Spin spinning={productDetailLoading}>
                  <SpecificationTab
                    checkProductExist={checkProductExist}
                    productDetail={productDetail}
                    productCode={productCode}
                  />
                </Spin>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
