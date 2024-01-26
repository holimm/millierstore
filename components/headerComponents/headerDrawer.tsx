import {
  Button,
  Checkbox,
  Col,
  Divider,
  DrawerProps,
  Flex,
  Form,
  Image,
  Input,
  List,
  Row,
  Typography,
} from "antd";
import { NavigationDrawer } from "../drawer";
import {
  DeleteOutlined,
  FacebookOutlined,
  GoogleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  DescriptionItemModel,
  FieldType,
  NavigationDrawerProps,
} from "@/models/navModel";
import NumberToDollarFormat from "@/helpers/commonHelpers";
import { useMemo, useState } from "react";
import { dataCart } from "@/data/cartData";
import { SigninButton } from "../common";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hooks";
import { getCart } from "@/redux/selectors/cart";

export const HeaderSearchDrawer: React.FC<NavigationDrawerProps> = (props) => {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const onChangeSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };
  const onSubmit = () => {
    router.push({ pathname: `/search/${searchKeyword}` });
  };
  return (
    <NavigationDrawer
      height={"4.5em"}
      placement="top"
      open={props.open}
      onClose={props.onClose}
      closable={false}
    >
      <div className="h-full w-full flex justify-center items-center text-black">
        <Input
          className="w-[30%]"
          size="large"
          bordered={false}
          placeholder="Enter a product's name ..."
          onChange={onChangeSearchKeyword}
          allowClear
        />
        <Button
          type="text"
          size="large"
          onClick={onSubmit}
          icon={<SearchOutlined />}
        ></Button>
      </div>
    </NavigationDrawer>
  );
};

export const HeaderCartDrawer: React.FC<NavigationDrawerProps> = (props) => {
  const cartList = useAppSelector(getCart);
  const DescriptionItem = ({
    title,
    content,
    quantity,
    price,
    total,
    type,
  }: DescriptionItemModel) => (
    <div className="site-description-item-profile-wrapper mt-2">
      <p className="site-description-item-profile-p-label">
        {type === "description" && `${title}: ${content}`}
        {type === "item_total" &&
          `${quantity} x ${NumberToDollarFormat(
            price
          )} = ${NumberToDollarFormat(quantity * price)}`}
        {type === "cart_total" && `Total: ${NumberToDollarFormat(total)}`}
      </p>
    </div>
  );
  console.log(cartList);
  const calculateCartTotal = useMemo(() => {
    let total = 0;
    return total;
  }, [dataCart]);

  return (
    <NavigationDrawer
      width={"25vw"}
      placement="right"
      open={props.open}
      onClose={props.onClose}
      title="My Cart"
      closable
    >
      <div className="h-full w-full text-black">
        <div className="h-[70%] overflow-y-auto">
          <List
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
                        <Button
                          type="default"
                          className="mt-2"
                          icon={<DeleteOutlined />}
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
        </div>
        <Divider />
        <DescriptionItem type={"cart_total"} total={calculateCartTotal} />
        <Divider />
        <Button type="default" className="w-full">
          Checkout
        </Button>
      </div>
    </NavigationDrawer>
  );
};

export const HeaderSigninDrawer: React.FC<NavigationDrawerProps> = (props) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <NavigationDrawer
      width={"20vw"}
      placement="right"
      open={props.open}
      onClose={props.onClose}
      closable={false}
    >
      <Flex className="h-full w-full" justify="center" align="center">
        <Form
          name="basic"
          layout="vertical"
          className="w-full mb-10"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Typography.Title level={4}>Sign In</Typography.Title>
          <Divider />
          <Form.Item<FieldType>
            name="username"
            label="Email"
            className="mt-2"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="py-3" placeholder="Email" size="middle" />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            label="Password"
            className="mt-8"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              className="py-3"
              placeholder="Password"
              size="middle"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            className="mt-8"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
            <Typography.Link className="float-right cursor-pointer">
              Forget Password?
            </Typography.Link>
          </Form.Item>

          <Form.Item>
            <SigninButton
              type="primary"
              htmlType="submit"
              extraClass="bg-blue-500"
            >
              Login
            </SigninButton>
          </Form.Item>
          <Divider plain>OR</Divider>
          <Form.Item>
            <SigninButton
              type="text"
              extraClass="bg-[#3a5997] text-white"
              icon={<FacebookOutlined />}
            >
              Login with Facebook
            </SigninButton>
          </Form.Item>
          <Form.Item>
            <SigninButton
              type="text"
              extraClass="bg-[#ea4236] text-white"
              icon={<GoogleOutlined />}
            >
              Login with Google
            </SigninButton>
          </Form.Item>
        </Form>
      </Flex>
    </NavigationDrawer>
  );
};
