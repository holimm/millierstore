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
import { FormCheckout } from "@/modules/checkout/formUpdateInformation";
import { useAuthen } from "@/hooks/useAuthen";

export default function Home() {
  const dispatch = useAppDispatch();
  const authenAccount = useAuthen();
  const cartSession = useCart();

  const cartList = useAppSelector(getCart);

  const handleRemoveFromCart = useCallback(
    (item: CartType) => {
      dispatch(removeFromCart(item));
    },
    [cartList]
  );

  const handleQuantity = useCallback(
    (item: CartType, quantity: number) => {
      const data = {
        name: item.name,
        storage: item.storage,
        color: item.color,
        quantity: quantity,
      };
      dispatch(updateQuantity(data));
    },
    [cartList]
  );

  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full">
        <div className="h-fit w-3/4 mx-auto py-20">
          <Row>
            <Col span={16}>
              <FormCheckout authenAccount={authenAccount && authenAccount} />
            </Col>
            <Col span={8}>
              <List
                className="max-h-[90vh] overflow-y-auto"
                itemLayout="horizontal"
                dataSource={cartList}
                renderItem={(item, index) => (
                  <List.Item>
                    <Row>
                      <Col span={8}>
                        <Flex justify="center" align="center">
                          <Image
                            height={"100%"}
                            width={"100%"}
                            src={`${process.env.MONGO_BE_URL}${item.color.image}`}
                            preview={false}
                          />
                        </Flex>
                      </Col>
                      <Col span={16}>
                        <Row>
                          <Col span={24}>
                            <DescriptionItem
                              type={"description"}
                              title="Name"
                              content={item.name}
                            />
                          </Col>
                          <Col span={24}>
                            <DescriptionItem
                              type={"description"}
                              title="Color"
                              content={item.color.label}
                            />
                          </Col>
                          <Col span={24}>
                            <DescriptionItem
                              type={"description"}
                              title="Price"
                              content={NumberToDollarFormat(item.storage.price)}
                            />
                          </Col>
                          <Col span={24}>
                            <div className="site-description-item-profile-wrapper mt-2">
                              <InputNumber
                                defaultValue={item.quantity}
                                onChange={(value) =>
                                  handleQuantity(item, value)
                                }
                              />
                            </div>
                          </Col>
                          <Col span={24}>
                            <Button
                              type="default"
                              className="mt-3"
                              icon={<DeleteOutlined />}
                              onClick={() => handleRemoveFromCart(item)}
                              danger
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
      </div>
    </main>
  );
}
