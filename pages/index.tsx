import { VideoPlayer } from "@/components/videoPlayer";
import { motion } from "framer-motion";
import { Button, Card, Image, Typography } from "antd";
import ReactPlayer from "react-player";
import CategoryIphone from "../assets/img/homepage/category_iphone.jpg";
import CategoryMac from "../assets/img/homepage/category_mac.jpg";
import CategoryAccessories from "../assets/img/homepage/category_accessories.jpg";
import { omit } from "lodash";
import {
  CategoryCard,
  CustomButton,
  CustomText,
} from "@/components/homePage/common";
import { CiCreditCard1 } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsShop } from "react-icons/bs";
import { ReactNode } from "react";
import iPhone14 from "../assets/img/products/iphone14/iphone14.webp";
import iPhone15 from "../assets/img/products/iphone15/iphone15.webp";
import iPhone15Pro from "../assets/img/products/iphone15/iphone15_pro.webp";
import iPhone15ProMax from "../assets/img/products/iphone15/iphone15_pro_max.webp";

export default function Home() {
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
  const renderProductCard = (objectProduct: {
    name: string;
    description: string;
    price: string;
    srcImage: string;
  }) => {
    return (
      <Card
        className="bg-white !p-0 !border-none"
        cover={
          <div className="pl-3 pr-3 pt-5">
            <Image src={objectProduct.srcImage} preview={false} />
          </div>
        }
      >
        <div className="h-fit w-full pb-6">
          <CustomText
            type="paragraph"
            extraClass="!text-xl !text-black !font-bold"
            topClass="!text-center"
          >
            {objectProduct.name}
          </CustomText>
          <CustomText
            type="paragraph"
            extraClass="!text-lg !text-black !font-sf_pro_text_light"
            topClass="!text-center"
          >
            {objectProduct.description}
          </CustomText>
          <CustomText
            type="paragraph"
            extraClass="!text-lg !text-black !font-sf_pro_text_light"
            topClass="!text-center mt-10"
          >
            {objectProduct.price}
          </CustomText>
          <div className="h-full w-full flex justify-start items-center mt-4">
            <Button className="mx-auto">Order now</Button>
          </div>
        </div>
      </Card>
    );
  };
  return (
    <main className={`h-fit w-full`}>
      <div className="h-[80vh] w-full relative">
        <div className="h-full w-full absolute">
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
                extraClass="!text-5xl !font-lobster"
                topClass="text-center"
              >
                Raijin Limited
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
        </div>
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
          <div className="h-fit w-full mx-auto mt-10 grid grid-cols-3 gap-20">
            <CategoryCard label="iPhone" src={CategoryIphone.src} />
            <CategoryCard label="Mac" src={CategoryMac.src} />
            <CategoryCard label="Accessories" src={CategoryAccessories.src} />
          </div>
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
          <div className="h-full w-full py-10 grid grid-cols-4 gap-10">
            {renderProductCard({
              name: "iPhone 15 Pro Max",
              description: "The ultimate iPhone.",
              price: "From $1199",
              srcImage: iPhone15ProMax.src,
            })}
            {renderProductCard({
              name: "iPhone 15 Pro",
              description: "The ultimate iPhone.",
              price: "From $999",
              srcImage: iPhone15Pro.src,
            })}
            {renderProductCard({
              name: "iPhone 15",
              description: "A total powerhouse.",
              price: "From $799",
              srcImage: iPhone15.src,
            })}
            {renderProductCard({
              name: "iPhone 14",
              description: "As amazing as ever.",
              price: "From $699",
              srcImage: iPhone14.src,
            })}
          </div>
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
            {renderProductCard({
              name: "iPhone 15 Pro Max",
              description: "The ultimate iPhone.",
              price: "From $1199",
              srcImage: iPhone15ProMax.src,
            })}
            {renderProductCard({
              name: "iPhone 15 Pro",
              description: "The ultimate iPhone.",
              price: "From $999",
              srcImage: iPhone15Pro.src,
            })}
            {renderProductCard({
              name: "iPhone 15",
              description: "A total powerhouse.",
              price: "From $799",
              srcImage: iPhone15.src,
            })}
            {renderProductCard({
              name: "iPhone 14",
              description: "As amazing as ever.",
              price: "From $699",
              srcImage: iPhone14.src,
            })}
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
