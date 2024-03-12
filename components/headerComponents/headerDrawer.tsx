import {
  Button,
  Checkbox,
  Col,
  Divider,
  Dropdown,
  Empty,
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
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FieldType, NavigationDrawerProps } from "@/models/navModel";
import {
  NumberToDollarFormat,
  calculateCartTotal,
  notificationMessage,
} from "@/helpers/commonHelpers";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CustomButton, DescriptionItem, RenderProductCard } from "../common";
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
import { debounce, isEmpty, throttle } from "lodash";
import { fetchProductsSearch } from "@/redux/entities/products";
import { getProductsSearch } from "@/redux/selectors/products";
import { CustomText } from "../homePage/common";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginLayout from "../googleLogin";
import { getLoginGoogleLoading } from "@/redux/selectors/googleLogin";

export const HeaderSearchDrawer: React.FC<NavigationDrawerProps> = (props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartSession = useCart();
  const [keyword, setKeyword] = useState<string>("");
  const [keywordThrottled, setKeywordThrottled] = useState<string>("");
  const productsList = useAppSelector(getProductsSearch);
  const checkExist = !isEmpty(productsList.data);

  const debounced = useCallback(
    debounce((keywordValue) => setKeywordThrottled(keywordValue), 300),
    []
  );

  useEffect(() => debounced(keyword), [keyword]);

  const onFinishSubmitSearch = () => {
    if (isEmpty(keyword)) {
      notificationMessage({
        type: "error",
        content: "Please enter a product's name",
      });
    } else {
      router.push({ pathname: `/search/${keyword}` });
      props.onClose();
    }
  };

  useEffect(() => {
    if (!isEmpty(keywordThrottled)) {
      dispatch(
        fetchProductsSearch({ params: { name: keywordThrottled.toString() } })
      );
    }
  }, [keywordThrottled]);

  const onChangeSearchKeyword = (value: string) => {
    setKeyword(value);
  };

  return (
    <NavigationDrawer
      className="bg-blue-500"
      height={"fit-content"}
      placement="top"
      open={props.open}
      onClose={props.onClose}
      closable={false}
    >
      <Flex className="h-[1em] w-2/5 mx-auto" justify="center" align="center">
        <Input
          className="w-full"
          size="large"
          bordered={false}
          placeholder="Enter a product's name ..."
          onChange={(e) => onChangeSearchKeyword(e.target.value)}
          allowClear
        />
        <Button
          htmlType="submit"
          type="text"
          size="large"
          icon={<SearchOutlined />}
          onClick={() => onFinishSubmitSearch()}
        ></Button>
      </Flex>
      <Divider />
      <Spin spinning={productsList.loading}>
        {checkExist ? (
          <>
            <div className="h-fit max-h-[50vh] w-2/5 mx-auto flex-row justify-center overflow-y-auto">
              {productsList.data.map((item: any, index: number) => (
                <div key={index}>
                  <Link href={`/products/${item._id}`}>
                    <div className="h-fit w-full flex gap-8">
                      <Image src={item.image} height={"6em"} />
                      <div className="h-full w-fit">
                        <CustomText
                          type="paragraph"
                          extraClass="!text-lg !text-black"
                        >
                          {item.name}
                          <br />
                          <span className="text-neutral-500 !text-sm">
                            {item.description}
                          </span>
                          <br />
                          <span className="text-neutral-500 !text-sm">
                            {`From ${NumberToDollarFormat(item.lowest_price)}`}
                          </span>
                        </CustomText>
                      </div>
                    </div>
                  </Link>
                  {/* // <RenderProductCard
                  //   code={item._id}
                  //   name={item.name}
                  //   description={item.description}
                  //   price={`From ${NumberToDollarFormat(item.lowest_price)}`}
                  //   srcImage={item.image}
                  // /> */}
                  <Divider />
                </div>
              ))}
            </div>
          </>
        ) : (
          <Empty />
        )}
      </Spin>
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
        memory: item.memory,
        color: item.color,
        price: item.price,
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
        <div className="h-[70%] overflow-y-auto overflow-x-hidden">
          <List
            itemLayout="horizontal"
            dataSource={cartList.data}
            renderItem={(item, index) => (
              <List.Item>
                <Row gutter={20}>
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
  const loadingGoogleLogin = useAppSelector(getLoginGoogleLoading);
  const onFinish = async (values: UserType) => {
    dispatch(fetchUserSignIn(values));
  };
  return (
    <NavigationDrawer
      width={"25%"}
      placement="right"
      open={props.open}
      onClose={props.onClose}
      closable={false}
    >
      <Spin spinning={userSigningIn.data || loadingGoogleLogin.data}>
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
              <Link href={"/forget-password"}>
                <Typography.Link className="cursor-pointer">
                  Forgot Password?
                </Typography.Link>
              </Link>
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
              <Link href={"/register"} onClick={() => props.onClose()}>
                <CustomButton
                  type="text"
                  extraClass="bg-blue-500 text-white"
                  icon={<UserAddOutlined />}
                >
                  Create an account
                </CustomButton>
              </Link>
            </Form.Item>
            <GoogleOAuthProvider clientId="296248512145-i1qchoom7g7adqiff9fnpeuu597jha7b.apps.googleusercontent.com">
              <React.StrictMode>
                <GoogleLoginLayout />
              </React.StrictMode>
            </GoogleOAuthProvider>
            <Form.Item>
              <CustomButton
                type="text"
                extraClass="bg-[#3a5997] text-white"
                icon={<FacebookOutlined />}
              >
                Login with Facebook
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
      label: (
        <span>
          Hello,{" "}
          {isEmpty(authenData.username)
            ? authenData.email
            : authenData.username}
        </span>
      ),
    },
    {
      key: "2",
      label: <Link href="/profile">Profile</Link>,
    },
    {
      key: "3",
      onClick: () => {
        dispatch(saveUser({}));
        localStorage.removeItem("signin_token");
        notificationMessage({ type: "success", content: "Logged out" });
      },
      label: "Logout",
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <Button type="text" size="large" icon={<UserOutlined />}></Button>
    </Dropdown>
  );
};
