import { VideoPlayer } from "@/components/videoPlayer";
import { Button, Card, Image, Spin, Typography } from "antd";
import { motion } from "framer-motion";
import { isEmpty, omit } from "lodash";
import {
  CategoryCard,
  CustomButton,
  CustomText,
} from "@/components/homePage/common";
import { CiCreditCard1 } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsShop } from "react-icons/bs";
import { ReactNode, useEffect, useState } from "react";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCategory, getProducts } from "@/redux/selectors/products";
import { fetchCategory, fetchProducts } from "@/redux/entities/products";
import { CategoryType, ProductsType } from "@/models/productModel";
import { RenderProductCard } from "@/components/common";
import Iphone15Cutout from "../assets/img/homepage/iphone15_cutout.png";
import Iphone15CutoutFront from "../assets/img/homepage/iphone15_cutout_front.png";
import Link from "next/link";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { fetchBlogs } from "@/redux/entities/blogs/asyncThunk";
import { getBlogs } from "@/redux/selectors/blogs";
import { BlogType } from "@/models/blogModel";

interface ProductHomepageBannerType {
  text_1?: string;
  text_2?: string;
  src_1?: string;
  src_2?: string;
  description?: string;
  linkHref?: string;
}

export default function Home() {
  const dispatch = useAppDispatch();
  const [productHomepage, setProductHomepage] =
    useState<ProductHomepageBannerType>({
      text_1: "iPhone 15",
      text_2: "PRO MAX",
      src_1: Iphone15Cutout.src,
      src_2: Iphone15CutoutFront.src,
      description: `The iPhone 15 Pro Max sets a new standard in smartphone
    innovation. With its sleek design, powerful A-series chip, and
    advanced camera capabilities, it delivers a seamless user
    experience. The device also offers impressive battery life and
    lightning-fast 5G connectivity, making it perfect for work or
    play.`,
      linkHref: "/products/65ad32cd673347ff096529d6",
    });
  const productsList = useAppSelector(getProducts);
  const categoryList = useAppSelector(getCategory);
  const blogsList = useAppSelector(getBlogs);
  const productListData = productsList.data;
  const blogListData = blogsList.data;

  console.log(blogsList);

  useEffect(() => {
    dispatch(fetchProducts({}));
    dispatch(fetchCategory());
    dispatch(fetchBlogs({}));
  }, []);

  const ProductHomepageBanner = (
    { productData },
    { productData: ProductHomepageBannerType }
  ) => {
    const [productImage, setProductImage] = useState(productData.src_1);

    const renderVerticalText = (values: {
      label: string;
      transitionData: any;
    }) => {
      return (
        <motion.div
          className="h-fit w-fit"
          style={{ writingMode: "vertical-rl", rotate: "180deg" }}
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          transition={values.transitionData}
        >
          <motion.span className="text-7xl text-black font-sf_pro_rounded">
            {values.label}
          </motion.span>
        </motion.div>
      );
    };

    const NavigateButton = ({ buttonIcon }: { buttonIcon: ReactNode }) => {
      return (
        <motion.div className="h-full w-fit mx-5 flex justify-center items-center">
          <motion.div
            className="h-fit w-fit cursor-pointer"
            initial={{ opacity: 0.2 }}
            whileHover={{ opacity: 0.5 }}
          >
            {buttonIcon}
          </motion.div>
        </motion.div>
      );
    };

    return (
      <>
        <div
          className="h-fit w-full py-20 bg-cover bg-center bg-no-repeat inline-block"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          }}
        >
          <div className="h-[32em] w-full flex justify-center items-center overflow-x-hidden">
            <NavigateButton
              buttonIcon={
                <LeftCircleOutlined
                  style={{ fontSize: "2em", color: "#000000" }}
                />
              }
            />
            {renderVerticalText({
              label: productData.text_1,
              transitionData: { duration: 1, delay: 0.5, ease: "easeInOut" },
            })}
            {renderVerticalText({
              label: productData.text_2,
              transitionData: { duration: 1.2, delay: 0.5, ease: "easeInOut" },
            })}
            <motion.img
              className="h-[32em] shadow-xl"
              src={productImage}
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
              onHoverStart={() => {
                setProductImage(productData.src_2);
              }}
              onHoverEnd={() => {
                setProductImage(productData.src_1);
              }}
            />
            <NavigateButton
              buttonIcon={
                <RightCircleOutlined
                  style={{ fontSize: "2em", color: "#000000" }}
                />
              }
            />
          </div>
          <motion.div
            className="h-fit w-2/5 mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
          >
            <p className="mt-10 text-black text-center font-sf_pro_text_light">
              {productData.description}
            </p>
          </motion.div>
          <motion.div
            className="h-20 w-fit mx-auto mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
          >
            <Link href={productData.linkHref}>
              <button className="px-16 py-2 text-black border-[1px] border-black rounded-full hover:bg-white hover:border-white hover:shadow-xl transition-all duration-100">
                ORDER NOW
              </button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="h-full w-full bg-white absolute top-0"
          initial={{ x: 0 }}
          animate={{ x: "-100vw", transitionEnd: { display: "none" } }}
          transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
        ></motion.div>
      </>
    );
  };

  const renderPickUsItem = (objectText: {
    icon: ReactNode;
    title: string;
    description: string;
  }) => {
    return (
      <div className="h-[20em] w-full flex justify-start items-center shadow-md rounded-xl p-5 hover:scale-[1.01] transition-all">
        <div className="h-fit w-fit">
          {objectText.icon}
          <CustomText type="title" level={2} topClass="mt-4">
            {objectText.title}
          </CustomText>
          <CustomText type="paragraph" extraClass="!text-black !text-xl">
            {objectText.description}
          </CustomText>
        </div>
      </div>
    );
  };
  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full relative">
        <ProductHomepageBanner productData={productHomepage} />
      </div>
      <div className="h-fit w-full">
        <div className="h-fit w-3/4 mx-auto pt-24">
          <div className="h-fit w-full grid grid-cols-3 gap-10 pb-20">
            {renderPickUsItem({
              icon: <CiCreditCard1 size={60} />,
              title: `Pay over time, interest-free.`,
              description: `Flexible payments, zero interest. Shop now and pay over time
            hassle-free.`,
            })}
            {renderPickUsItem({
              icon: <CiDeliveryTruck size={58} />,
              title: `Get flexible delivery and easy pickup.`,
              description: `Flexible delivery, convenient pickup options for seamless shopping experience.`,
            })}
            {renderPickUsItem({
              icon: <BsShop size={46} />,
              title: `Explore a shopping experience designed around you.`,
              description: `Discover a shopping journey crafted to match your unique preferences.`,
            })}
          </div>
          <Typography.Title className="text-center">
            <span className="!font-sf_pro">Explore Categories</span>
          </Typography.Title>
          <Typography.Paragraph className="text-center text-lg">
            <span className="!font-sf_pro_text_light">
              Discover diverse categories for a personalized shopping experience
            </span>
          </Typography.Paragraph>
          <Spin spinning={categoryList.loading}>
            <div className="h-fit w-full mx-auto mt-10 grid grid-cols-3 gap-20">
              {categoryList.data.map((item: CategoryType, index) => (
                <CategoryCard
                  key={index}
                  label={item.name}
                  src={`${process.env.MONGO_BE_URL}${item.image}`}
                />
              ))}
            </div>
          </Spin>
        </div>
        <div className="h-fit w-3/4 mx-auto py-20">
          <Typography.Title className="text-center">
            <span className="!font-sf_pro">Featured Products</span>
          </Typography.Title>
          <Typography.Paragraph className="text-center text-lg">
            <span className="!font-sf_pro_text_light">
              Discover our latest collection of high-quality products
            </span>
          </Typography.Paragraph>
          <Spin spinning={productsList.loading}>
            <div className="h-full w-full py-10 grid grid-cols-4 gap-10">
              {!isEmpty(productListData) &&
                productListData["iPhone"].map(
                  (item: ProductsType, index: number) => (
                    <div key={index}>
                      <RenderProductCard
                        code={item._id}
                        name={item.name}
                        description={item.description}
                        price={`From ${NumberToDollarFormat(
                          item.lowest_price
                        )}`}
                        srcImage={item.image}
                      />
                    </div>
                  )
                )}
            </div>
          </Spin>
        </div>
        <div className="h-[20em] w-full inline-block relative">
          <div className="h-full w-full absolute">
            <div className="h-full w-full">
              <div className="h-full w-full relative overflow-hidden">
                <VideoPlayer urlVideo="./assets/videos/mac_advertise.mp4" />
              </div>
            </div>
          </div>
          <div className="h-full w-full bg-black/20 backdrop-blur-sm absolute top-0 z-10"></div>
          <div className="h-full w-full absolute top-0 z-20">
            <div className="h-full w-full flex justify-center items-center p-20">
              <div className="h-fit w-fit">
                <CustomText
                  type="paragraph"
                  extraClass="!text-3xl !font-sf_pro_rounded"
                  topClass="text-center"
                >
                  24/7 phone support, expert assistance for seamless
                  resolutions.
                </CustomText>
                <CustomText
                  type="paragraph"
                  extraClass="!text-3xl !font-sf_pro_rounded"
                  topClass="text-center"
                >
                  Your satisfaction, our priority.
                </CustomText>
                <CustomButton extraClass="!mt-6">Contact Support</CustomButton>
              </div>
            </div>
          </div>
        </div>
        <div className="h-fit w-3/4 mx-auto pt-20 pb-10">
          <Typography.Title className="text-center">
            <span className="!font-sf_pro">New Arrival</span>
          </Typography.Title>
          <Typography.Paragraph className="text-center text-lg">
            <span className="!font-sf_pro_text_light">
              Introducing our latest collection
            </span>
          </Typography.Paragraph>
          <div className="h-full w-full py-10 grid grid-cols-4 gap-10">
            {!isEmpty(productListData) &&
              productListData["iPhone"].map(
                (item: ProductsType, index: number) => (
                  <div key={index}>
                    <RenderProductCard
                      code={item._id}
                      name={item.name}
                      description={item.description}
                      price={`From ${NumberToDollarFormat(item.lowest_price)}`}
                      srcImage={item.image}
                    />
                  </div>
                )
              )}
          </div>
        </div>

        <div className="h-fit w-3/4 mx-auto">
          <Typography.Title className="text-center">
            <span className="!font-sf_pro">News</span>
          </Typography.Title>
          <Typography.Paragraph className="text-center text-lg">
            <span className="!font-sf_pro_text_light">
              Stay up to date with the latest blog posts
            </span>
          </Typography.Paragraph>
          <div className="h-fit w-full pt-10 pb-40 grid grid-cols-3 gap-10">
            <Spin spinning={blogsList.loading}>
              {!isEmpty(blogListData) &&
                blogListData.map((item: BlogType, index: number) => (
                  <Link href={`/blogs/${item.idTitle}`}>
                    <Card
                      className="shadow-md cursor-pointer"
                      cover={
                        <div className="pt-2 px-2">
                          <Image
                            src={`${process.env.MONGO_BE_URL}/${item.images.thumbnail}`}
                            preview={false}
                          ></Image>
                        </div>
                      }
                      hoverable
                    >
                      <Typography.Paragraph ellipsis={{ rows: 2 }}>
                        <span
                          className={
                            "!text-xl !text-black !font-bold !font-sf_pro_text_light"
                          }
                        >
                          {item.title}
                        </span>
                      </Typography.Paragraph>
                      <Typography.Paragraph ellipsis={{ rows: 3 }}>
                        <span
                          className={
                            "!text-lg !text-black !font-sf_pro_text_light"
                          }
                        >
                          {item.chapeau}
                        </span>
                      </Typography.Paragraph>
                    </Card>
                  </Link>
                ))}
            </Spin>
            <Card
              className="shadow-md"
              cover={
                <div className="pt-2 px-2">
                  <Image
                    src="https://shopdunk.com/images/thumbs/0021924_iphone-15-pro-mau-titan-trang-ngoai-doi-thuc-khong-co-su-khac-biet-so-voi-tren-anh_1600.png"
                    preview={false}
                  ></Image>
                </div>
              }
            >
              <Typography.Paragraph ellipsis={{ rows: 2 }}>
                <span className={"!text-xl !text-black !font-semibold"}>
                  Exploring the Latest Trends in Smartphone Technology
                </span>
              </Typography.Paragraph>
              <Typography.Paragraph ellipsis={{ rows: 3 }}>
                <span className={"!text-lg !text-black"}>
                  In today's fast-paced world, smartphones have become an
                  indispensable part of our daily lives.
                </span>
              </Typography.Paragraph>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
