import { Drawer, Input, Space, Button, Row, Col, Image, Flex, List, Divider } from "antd"
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { ReactComponentElement, useMemo } from "react"
import NumberToDollarFormat from "@/helpers/commonHelpers";

type Placement = 'left' | 'right' | 'top' | 'bottom';

const data = [
  {
    name: 'Razer Seiren X',
    color: 'Black',
    quantity: 5,
    price: 200,
  },
  {
    name: 'Razer Seiren X',
    color: 'Black',
    quantity: 5,
    price: 200,
  },
  {
    name: 'Razer Seiren X',
    color: 'Black',
    quantity: 5,
    price: 200,
  },
  {
    name: 'Razer Seiren X',
    color: 'Black',
    quantity: 5,
    price: 200,
  },
  {
    name: 'Razer Seiren X',
    color: 'Black',
    quantity: 5,
    price: 200,
  },
  {
    name: 'Razer Seiren X',
    color: 'Black',
    quantity: 5,
    price: 200,
  },
];

interface NavDrawerModel {
  placement: Placement,
  showDrawer: boolean;
  handleShowDrawer: () => void;
}

interface DescriptionItemModel {
  title?: string;
  content?: React.ReactNode;
  quantity?: number;
  price?: number;
  total?: number;
  type: string
}

const DescriptionItem = ({ title, content, quantity, price, total, type }: DescriptionItemModel) => (
  <div className="site-description-item-profile-wrapper mt-2">
    <p className="site-description-item-profile-p-label">
      {type === "description" && `${title}: ${content}`}
      {type === "item_total" && `${quantity} x ${NumberToDollarFormat(price)} = ${NumberToDollarFormat(quantity*price)}`}
      {type === "cart_total" && `Total: ${NumberToDollarFormat(total)}`}
    </p>
  </div>
);

const calculateCartTotal = useMemo(()=>{
  let total = 0;
  return total;
}, [data])

export const NavDrawer = (props: NavDrawerModel) => {
    return (
    <Drawer
        height={"4rem"}
        placement={props.placement}
        open={props.showDrawer}
        onClose={props.handleShowDrawer}
        closable={false}
      >
        <div className="h-full w-full flex justify-center items-center text-black">
          <Input className="w-[30%]" size="large" bordered={false} placeholder="Enter a product's name ..."/>
          <Button
            type="text"
            size="large"
            icon={<SearchOutlined />}
          ></Button>
        </div>
      </Drawer>
    )
}

export const CartDrawer = (props: NavDrawerModel) => {
  return (
  <Drawer
      height={"4rem"}
      placement={props.placement}
      open={props.showDrawer}
      onClose={props.handleShowDrawer}
      title={"My Cart"}
      width={"30vw"}
      closable={true}
    >
      <div className="h-full w-full text-black">
        <div className="h-[70%] overflow-y-auto">
            <List 
              itemLayout="horizontal" 
              dataSource={data}
              renderItem={(item, index) =>
                <List.Item>
                  <Row>   
                    <Col span={8}>
                      <Flex justify="center" align="center">
                          <Image height={"10em"} src={"./assets/products/seiren_x/main.png"} preview={false}/>
                      </Flex>
                    </Col>
                    <Col span={16}>
                      <Row>
                        <Col span={24}>
                          <DescriptionItem type={"description"} title="Name" content={item.name}/>
                        </Col>
                        <Col span={24}>
                          <DescriptionItem type={"description"} title="Color" content={item.color}/>
                        </Col>
                        <Col span={24}>
                          <DescriptionItem type={"item_total"} quantity={item.quantity} price={item.price}/>
                        </Col>
                        <Col span={24}>
                          <Button type="default" className="mt-2" icon={<DeleteOutlined />} danger>
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    </Col> 
                  </Row>     
                </List.Item>        
              }            
            />
        </div>
        <Divider/>
        <DescriptionItem type={"cart_total"} total={calculateCartTotal}/>
        <Divider/>
        <Button type="default" className="w-full">Checkout</Button>
      </div>
    </Drawer>
  )
}