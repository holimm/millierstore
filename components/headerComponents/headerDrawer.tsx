import {
  Button,
  Checkbox,
  Col,
  Divider,
  Dropdown,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  List,
  MenuProps,
  Row,
  Spin,
  Typography,
} from "antd";
import { NavigationDrawer } from "../drawer";
import {
  DeleteOutlined,
  FacebookOutlined,
  GoogleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FieldType, NavigationDrawerProps } from "@/models/navModel";
import {
  NumberToDollarFormat,
  calculateCartTotal,
  notificationMessage,
} from "@/helpers/commonHelpers";
import { useCallback, useState } from "react";
import { CustomButton, DescriptionItem } from "../common";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCart } from "@/redux/selectors/cart";
import { removeFromCart, updateQuantity } from "@/redux/entities/cart";
import { CartType } from "@/models/cartModel";
import { UserType } from "@/models/userModel";
import { fetchUserSignIn } from "@/redux/entities/users/asyncThunk";
import { getUserSigninLoading } from "@/redux/selectors/user";
import { saveUser } from "@/redux/entities/users";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export const HeaderSearchDrawer: React.FC<NavigationDrawerProps> = (props) => {
  const router = useRouter();
  const cartSession = useCart();
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
  const dispatch = useAppDispatch();
  const cartSession = useCart();
  const cartList = useAppSelector(getCart);

  const handleRemoveFromCart = useCallback(
    (item: CartType) => {
      dispatch(removeFromCart(item));
    },
    [cartList.data]
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
    [cartList.data]
  );

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
            dataSource={cartList.data}
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
                            value={item.quantity}
                            min={1}
                            max={20}
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
        </div>
        <Divider />
        <DescriptionItem
          type={"cart_total"}
          total={calculateCartTotal(cartList.data)}
        />
        <Divider />
        <Link href={"/checkout"}>
          <Button type="default" className="w-full">
            Checkout
          </Button>
        </Link>
      </div>
    </NavigationDrawer>
  );
};

export const HeaderSigninDrawer: React.FC<NavigationDrawerProps> = (props) => {
  const dispatch = useAppDispatch();
  const userSigningIn = useAppSelector(getUserSigninLoading);
  const onFinish = async (values: UserType) => {
    dispatch(fetchUserSignIn(values));
  };
  return (
    <NavigationDrawer
      width={"30%"}
      placement="right"
      open={props.open}
      onClose={props.onClose}
      closable={false}
    >
      <Spin spinning={userSigningIn}>
        <Flex className="h-full w-full" justify="center" align="center">
          <Form
            name="basic"
            layout="vertical"
            className="w-full mb-10"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Typography.Title level={4}>Sign In</Typography.Title>
            <Divider />
            <Form.Item<FieldType>
              name="username"
              label="Email"
              className="mt-2"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input className="py-3" placeholder="Email" size="middle" />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              label="Password"
              className="mt-8"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
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
            </Form.Item>
            <Form.Item<FieldType>>
              <Typography.Link className="cursor-pointer">
                Forget Password?
              </Typography.Link>
            </Form.Item>
            <Form.Item>
              <CustomButton
                type="primary"
                htmlType="submit"
                extraClass="bg-blue-500"
              >
                Login
              </CustomButton>
            </Form.Item>
            <Divider plain>OR</Divider>
            <Form.Item>
              <CustomButton
                type="text"
                extraClass="bg-[#3a5997] text-white"
                icon={<FacebookOutlined />}
              >
                Login with Facebook
              </CustomButton>
            </Form.Item>
            <Form.Item>
              <CustomButton
                type="text"
                extraClass="bg-[#ea4236] text-white"
                icon={<GoogleOutlined />}
              >
                Login with Google
              </CustomButton>
            </Form.Item>
          </Form>
        </Flex>
      </Spin>
    </NavigationDrawer>
  );
};

export const HeaderProfileDropdown = ({
  authenData,
}: {
  authenData: UserType;
}) => {
  const dispatch = useAppDispatch();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>Hello, {authenData.username}</span>,
    },
    {
      key: "2",
      label: <Link href="/profile">Profile</Link>,
    },
    {
      key: "3",
      label: (
        <span
          onClick={() => {
            dispatch(saveUser({}));
            localStorage.removeItem("signin_token");
            notificationMessage({ type: "success", content: "Logged out" });
          }}
        >
          Logout
        </span>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <Button type="text" size="large" icon={<UserOutlined />}></Button>
    </Dropdown>
  );
};
