import { VideoPlayer } from "@/components/videoPlayer";
import { Button, Spin, Typography } from "antd";
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

export default function Home() {
  const dispatch = useAppDispatch();
  const [animateHomepage, setAnimateHomepage] = useState(true);
  const [iPhone15HomePage, setIphone15Homepage] = useState(Iphone15Cutout.src);
  const productsList = useAppSelector(getProducts);
  const categoryList = useAppSelector(getCategory);
  const productListData = productsList.data;

  useEffect(() => {
    dispatch(fetchProducts({}));
    dispatch(fetchCategory());
  }, []);

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
        <div
          className="h-fit w-full py-20 bg-cover bg-center bg-no-repeat inline-block"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          }}
        >
          <div className="h-[32em] w-full flex justify-center items-center overflow-x-hidden">
            <motion.div
              className="h-fit w-fit"
              style={{ writingMode: "vertical-rl", rotate: "180deg" }}
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            >
              <motion.span className="text-7xl font-sf_pro_rounded">
                iPhone 15
              </motion.span>
            </motion.div>
            <motion.div
              className="h-fit w-fit mr-6"
              style={{ writingMode: "vertical-rl", rotate: "180deg" }}
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
            >
              <motion.span className="text-7xl font-sf_pro_rounded">
                PRO MAX
              </motion.span>
            </motion.div>
            {iPhone15HomePage === Iphone15Cutout.src && animateHomepage && (
              <motion.img
                className="h-[32em] shadow-xl"
                src={iPhone15HomePage}
                initial={{ x: "100vw" }}
                animate={{ x: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                onAnimationComplete={() => {
                  setAnimateHomepage(false);
                }}
                onMouseEnter={() => {
                  setIphone15Homepage(Iphone15CutoutFront.src);
                }}
              />
            )}
            {iPhone15HomePage === Iphone15Cutout.src &&
              animateHomepage === false && (
                <motion.img
                  className="h-[32em] shadow-xl"
                  src={iPhone15HomePage}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                  onMouseEnter={() => {
                    setIphone15Homepage(Iphone15CutoutFront.src);
                  }}
                />
              )}
            {iPhone15HomePage === Iphone15CutoutFront.src && (
              <motion.img
                className="h-[32em] shadow-xl"
                src={iPhone15HomePage}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                onMouseLeave={() => {
                  setIphone15Homepage(Iphone15Cutout.src);
                }}
              />
            )}
          </div>
          <motion.div
            className="h-fit w-2/5 mx-auto"
            initial={{ y: "100vw" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          >
            <p className="mt-10 text-center font-sf_pro_text_light">
              The iPhone 15 Pro Max sets a new standard in smartphone
              innovation. With its sleek design, powerful A-series chip, and
              advanced camera capabilities, it delivers a seamless user
              experience. The device also offers impressive battery life and
              lightning-fast 5G connectivity, making it perfect for work or
              play.
            </p>
          </motion.div>
          <motion.div
            className="h-20 w-fit mx-auto mt-10"
            initial={{ y: "100vw" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
          >
            <Link href="/products/65ad32cd673347ff096529d6">
              <button className="px-16 py-2 border-[1px] border-black rounded-full hover:bg-white hover:border-white hover:shadow-xl transition-all duration-100">
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
        {/* <div className="h-full w-full absolute">
          <div className="h-full w-full">
            <div className="h-full w-full relative overflow-hidden">
              <VideoPlayer urlVideo="./assets/videos/homepage_video.mp4" />
            </div>
          </div>
        </div>
        <div className="h-full w-full bg-black/20 absolute top-0 z-10"></div>
        <div className="h-full w-full absolute top-0 z-20">
          <div className="h-full w-full flex justify-center items-center p-20">
            <div className="h-fit w-fit">
              <CustomText
                type="paragraph"
                extraClass="!text-5xl"
                topClass="text-center"
              >
                <span className=" font-lobster">Millier</span>
              </CustomText>
              <CustomText
                type="paragraph"
                extraClass="!text-2xl"
                topClass="text-center"
              >
                Discover cutting-edge phones. Elevate your mobile experience
                with us.
              </CustomText>
              <CustomButton extraClass="!mt-6">Check our products</CustomButton>
            </div>
          </div>
        </div> */}
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
        <div className="h-[20em] w-full relative">
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
            New Arrival
          </Typography.Title>
          <Typography.Paragraph className="text-center text-lg">
            Introducing our latest collection
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
        <div className="h-fit w-3/4 mx-auto pb-32">
          <div className="h-fit w-full grid grid-cols-2 gap-10">
            <div className="h-80 w-full bg-slate-500 rounded-xl"></div>
            <div className="h-80 w-full bg-slate-500 rounded-xl"></div>
          </div>
          <div className="h-fit w-full grid grid-cols-3 gap-20 mt-10">
            <div className="h-80 w-full bg-slate-500 rounded-xl"></div>
            <div className="h-80 w-full bg-slate-500 rounded-xl"></div>
            <div className="h-80 w-full bg-slate-500 rounded-xl"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
