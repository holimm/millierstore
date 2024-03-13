import { VideoPlayer } from "@/components/videoPlayer";
import { motion } from "framer-motion";
import { chunk, debounce, first, isEmpty, throttle } from "lodash";
import { CustomButton, CustomText } from "@/components/homePage/common";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCategory, getProducts } from "@/redux/selectors/products";
import { fetchCategory, fetchProducts } from "@/redux/entities/products";
import Iphone15ProCutout from "../assets/img/homepage/iphone15_cutout.png";
import Iphone15ProCutoutFront from "../assets/img/homepage/iphone15_cutout_front.png";
import Iphone15Cutout from "../assets/img/homepage/iphone15_2_cutout.png";
import Iphone15CutoutFront from "../assets/img/homepage/iphone15_2_cutout_front.png";
import Link from "next/link";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { fetchBlogs } from "@/redux/entities/blogs/asyncThunk";
import { getBlogs } from "@/redux/selectors/blogs";
import { NavigateButton } from "@/components/homePage/common";
import { HomepageNewArrival } from "@/components/homePage/newArrival";
import { HomepageFeaturedProducts } from "@/components/homePage/featuredProducts";
import { HomepageExploreCategory } from "@/components/homePage/exploreCategory";
import { PickUs } from "@/components/homePage/pickUs";
import { HomepageBlogs } from "@/components/homePage/homepageBlogs";
import { ProductHomepageBannerType } from "@/models/homepage";

const productHomepageData = [
  {
    text_1: "iPhone 15",
    text_2: "PRO MAX",
    src_1: Iphone15ProCutout.src,
    src_2: Iphone15ProCutoutFront.src,
    description: `The iPhone 15 Pro Max sets a new standard in smartphone
innovation. With its sleek design, powerful A-series chip, and
advanced camera capabilities, it delivers a seamless user
experience. The device also offers impressive battery life and
lightning-fast 5G connectivity, making it perfect for work or
play.`,
    linkHref: "/products/65ad32cd673347ff096529d6",
  },
  {
    text_1: "iPhone 15",
    text_2: "PLUS",
    src_1: Iphone15Cutout.src,
    src_2: Iphone15CutoutFront.src,
    description: `The iPhone 15 Plus offers cutting-edge technology and sleek design. With its advanced features and powerful performance, it's the perfect companion for your daily tasks and entertainment needs. Experience stunning visuals, seamless multitasking, and enhanced security with the iPhone 15 Plus.`,
    linkHref: "/products/65b340160954165b4225d87d",
  },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const [productHomepageImageIndex, setProductHomepageImageIndex] = useState(0);
  const [productHomepageImageIsFirst, setProductHomepageImageIsFirst] =
    useState(true);
  const productsList = useAppSelector(getProducts);
  const categoryList = useAppSelector(getCategory);
  const blogsList = useAppSelector(getBlogs);

  const debounceChangeHomepageBanner = useCallback(
    debounce((type: "prev" | "next") => {
      if (type === "prev") {
        if (productHomepageImageIndex !== 0)
          setProductHomepageImageIndex(productHomepageImageIndex - 1);
        else setProductHomepageImageIndex(productHomepageData.length - 1);
      }
      if (type === "next") {
        if (productHomepageImageIndex !== productHomepageData.length - 1)
          setProductHomepageImageIndex(productHomepageImageIndex + 1);
        else setProductHomepageImageIndex(0);
      }
      setProductHomepageImageIsFirst(false);
    }, 200),
    [productHomepageImageIndex]
  );

  const onChangeHomepageBanner = (type: "prev" | "next") => {
    debounceChangeHomepageBanner(type);
  };

  useEffect(() => {
    dispatch(fetchProducts({}));
    dispatch(fetchCategory());
    dispatch(fetchBlogs({}));
  }, []);

  const ProductHomepageBanner = ({
    productData,
    isFirstTime,
    onChangeHomepageBanner,
  }: {
    productData: ProductHomepageBannerType;
    isFirstTime: boolean;
    onChangeHomepageBanner: (type: string) => void;
  }) => {
    const [productImage, setProductImage] = useState(
      productData && productData.src_1
    );

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
          <motion.span className="text-4xl lg:text-7xl text-black font-sf_pro_rounded">
            {values.label}
          </motion.span>
        </motion.div>
      );
    };

    return (
      <>
        {!isEmpty(productData) && (
          <>
            <div
              className="h-fit w-full pt-20 pb-10 lg:pt-20 lg:pb-20 bg-cover bg-center bg-no-repeat inline-block"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
              }}
            >
              <div className="h-[20em] lg:h-[32em] w-full flex justify-center items-center overflow-x-hidden">
                <NavigateButton
                  buttonIcon={
                    <LeftCircleOutlined
                      style={{ fontSize: "2em", color: "#000000" }}
                    />
                  }
                  buttonType="prev"
                  onChangeHomepageBanner={onChangeHomepageBanner}
                />
                {renderVerticalText({
                  label: productData.text_1,
                  transitionData: {
                    duration: 1,
                    delay: isFirstTime ? 0.5 : 0,
                    ease: "easeInOut",
                  },
                })}
                {renderVerticalText({
                  label: productData.text_2,
                  transitionData: {
                    duration: 1.2,
                    delay: isFirstTime ? 0.5 : 0,
                    ease: "easeInOut",
                  },
                })}
                <motion.img
                  className="h-[20em] lg:h-[32em] shadow-xl"
                  src={productImage}
                  initial={{ x: "100vw" }}
                  animate={{ x: 0 }}
                  transition={{
                    duration: 1,
                    delay: isFirstTime ? 0.5 : 0,
                    ease: "easeInOut",
                  }}
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
                  buttonType="next"
                  onChangeHomepageBanner={onChangeHomepageBanner}
                />
              </div>
              <motion.div
                className="h-fit w-11/12 lg:w-2/5 mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: isFirstTime ? 1.2 : 0,
                  ease: "easeInOut",
                }}
              >
                <p className="mt-10 text-black text-center font-sf_pro_text_light">
                  {productData.description}
                </p>
              </motion.div>
              <motion.div
                className="h-20 w-fit mx-auto mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: isFirstTime ? 1.2 : 0,
                  ease: "easeInOut",
                }}
              >
                <Link href={productData.linkHref}>
                  <button className="px-16 py-2 text-black border-[1px] border-black rounded-full hover:bg-white hover:border-white hover:shadow-xl transition-all duration-100">
                    ORDER NOW
                  </button>
                </Link>
              </motion.div>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full relative">
        <ProductHomepageBanner
          productData={productHomepageData[productHomepageImageIndex]}
          isFirstTime={productHomepageImageIsFirst}
          onChangeHomepageBanner={onChangeHomepageBanner}
        />
        <motion.div
          className="h-full w-full bg-white absolute top-0"
          initial={{ x: 0 }}
          animate={{ x: "-100vw", transitionEnd: { display: "none" } }}
          transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
        ></motion.div>
      </div>
      <div className="h-fit w-full">
        <div className="h-fit w-11/12 lg:w-3/4 mx-auto pt-10 lg:pt-24">
          <PickUs />
        </div>
        <div className="h-fit w-11/12 lg:w-3/4 mx-auto pt-10 lg:pt-24">
          <HomepageExploreCategory categoryList={categoryList} />
        </div>
        <div className="h-fit w-11/12 lg:w-3/4 mx-auto py-5 lg:py-20">
          <HomepageFeaturedProducts productsList={productsList} />
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
            <div className="h-full w-full flex justify-center items-center p-2 lg:p-20">
              <div className="h-fit w-fit">
                <CustomText
                  type="paragraph"
                  extraClass="!text-xl lg:!text-3xl !font-sf_pro_rounded"
                  topClass="text-center"
                >
                  24/7 phone support, expert assistance for seamless
                  resolutions.
                </CustomText>
                <CustomText
                  type="paragraph"
                  extraClass="!text-xl lg:!text-3xl !font-sf_pro_rounded"
                  topClass="text-center"
                >
                  Your satisfaction, our priority.
                </CustomText>
                <CustomButton extraClass="!mt-6">Contact Support</CustomButton>
              </div>
            </div>
          </div>
        </div>
        <div className="h-fit w-11/12 lg:w-3/4 mx-auto pt-20 pb-0 lg:pb-10">
          <HomepageNewArrival productsList={productsList} />
        </div>
        <div className="h-fit w-11/12 lg:w-3/4 mx-auto pb-10">
          <HomepageBlogs blogsList={blogsList} />
        </div>
      </div>
    </main>
  );
}
