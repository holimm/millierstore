import { DescriptionItem } from "@/components/common";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import { CartType } from "@/models/cartModel";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Image, InputNumber, List, Row } from "antd";
import { isEmpty } from "lodash";

export const ListCart = ({
  cartList,
  showCartFunction,
  maxHeight = "80vh",
  handleRemoveFromCart,
  handleQuantity,
}: {
  cartList: CartType[];
  showCartFunction?: boolean;
  maxHeight?: string;
  handleRemoveFromCart?: (item: CartType) => void;
  handleQuantity?: (item: CartType, quantity: number) => void;
}) => {
  return (
    <List
      style={{
        height: "fit-content",
        overflowY: "auto",
        maxHeight: maxHeight,
        overflowX: "hidden",
      }}
      itemLayout="horizontal"
      dataSource={cartList}
      renderItem={(item, index) => (
        <List.Item>
          <Row gutter={30}>
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
                {!isEmpty(item.storage) && (
                  <Col span={24}>
                    <DescriptionItem
                      type={"description"}
                      title="Storage"
                      content={`${item.storage.capacity} ${item.storage.unit}`}
                    />
                  </Col>
                )}
                {!isEmpty(item.memory) && (
                  <Col span={24}>
                    <DescriptionItem
                      type={"description"}
                      title="Memory"
                      content={`${item.memory.capacity} ${item.memory.unit}`}
                    />
                  </Col>
                )}
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
                    content={NumberToDollarFormat(item.price)}
                  />
                </Col>
                <Col span={24}>
                  <div className="site-description-item-profile-wrapper mt-2">
                    {showCartFunction ? (
                      <InputNumber
                        value={item.quantity}
                        min={1}
                        max={20}
                        onChange={(value) => handleQuantity(item, value)}
                      />
                    ) : (
                      <Col span={24}>
                        <DescriptionItem
                          type={"description"}
                          title="Quantity"
                          content={item.quantity}
                        />
                      </Col>
                    )}
                  </div>
                </Col>
                {showCartFunction && (
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
                )}
              </Row>
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};
