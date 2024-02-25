import {
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Image,
  InputNumber,
  List,
  Row,
  Spin,
  Typography,
} from "antd";
import { isEmpty, omit } from "lodash";
import { CustomText } from "@/components/homePage/common";
import { useCallback, useEffect, useMemo } from "react";
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
import { DescriptionItem, RenderProductCard } from "@/components/common";
import { CategoryProducts } from "@/components/products/categoryProducts";
import { getCart } from "@/redux/selectors/cart";
import { CartType } from "@/models/cartModel";
import { removeFromCart, updateQuantity } from "@/redux/entities/cart";
import { DeleteOutlined } from "@ant-design/icons";
import { useCart } from "@/hooks/useCart";
import { FormCheckout } from "@/modules/checkout/formCheckout";
import { useAuthen } from "@/hooks/useAuthen";
import { ListCart } from "@/modules/checkout/listCart";

export default function Home() {
  const dispatch = useAppDispatch();
  const authenAccount = useAuthen();
  const cartSession = useCart();
  const cartList = useAppSelector(getCart);

  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full">
        <div className="h-fit w-3/4 mx-auto py-20">
          <Row gutter={20}>
            <Col span={16}>
              <FormCheckout authenAccount={authenAccount && authenAccount} />
            </Col>
            <Col span={8}>
              <ListCart cartList={cartList} />
            </Col>
          </Row>
        </div>
      </div>
    </main>
  );
}
