import { DescriptionItem } from "@/components/common";
import { CustomText } from "@/components/homePage/common";
import {
  NumberToDollarFormat,
  calculateCartTotal,
} from "@/helpers/commonHelpers";
import { CartType } from "@/models/cartModel";
import { CheckoutInformationType } from "@/models/checkoutModel";
import { removeFromCart, updateQuantity } from "@/redux/entities/cart";
import { useAppDispatch } from "@/redux/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  List,
  Row,
} from "antd";
import { isEmpty } from "lodash";
import { useCallback } from "react";

export const ListCart = ({ cartList }: { cartList: CartType[] }) => {
  const dispatch = useAppDispatch();
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
    <>
      <CustomText
        type="paragraph"
        extraClass="!text-black !font-semibold"
        topClass="!text-xl"
      >
        My Cart
      </CustomText>
      <Divider />
      <List
        style={{ height: "fit-content", overflowY: "auto", maxHeight: "80vh" }}
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
                        onChange={(value) => handleQuantity(item, value)}
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
      <Divider />
      <CustomText type="paragraph" extraClass="!text-lg !text-black">
        Total: {NumberToDollarFormat(calculateCartTotal(cartList))}
      </CustomText>
      {!isEmpty(cartList) && (
        <Form.Item<CheckoutInformationType>
          name="total"
          rules={[{ required: true }]}
          hidden
        >
          <Input />
        </Form.Item>
      )}
    </>
  );
};
