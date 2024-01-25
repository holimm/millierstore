import { VideoPlayer } from "@/components/videoPlayer";
import { motion } from "framer-motion";
import { Button, Card, Image, Typography } from "antd";
import ReactPlayer from "react-player";
import CategoryIphone from "../../assets/img/homepage/category_iphone.jpg";
import CategoryMac from "../../assets/img/homepage/category_mac.jpg";
import CategoryAccessories from "../../assets/img/homepage/category_accessories.jpg";
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
import iPhone14 from "../../assets/img/products/iphone14/iphone14.webp";
import iPhone15 from "../../assets/img/products/iphone15/iphone15.webp";
import iPhone15Pro from "../../assets/img/products/iphone15/iphone15_pro.webp";
import iPhone15ProMax from "../../assets/img/products/iphone15/iphone15_pro_max.webp";
import NumberToDollarFormat from "@/helpers/commonHelpers";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/entities/products";
import { getProducts } from "@/redux/selectors/products";

export default function Home() {
  const dispatch = useAppDispatch();
  const productsList = useAppSelector(getProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  console.log(productsList);

  const renderProductCard = (objectProduct: {
    code: string;
    name: string;
    description: string;
    price: string;
    srcImage: string;
  }) => {
    return (
      <Card
        className="bg-white !p-0 !border-none cursor-pointer"
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
          <div className="h-full w-full flex justify-center items-center mt-4">
            <Link href={`/products/${objectProduct.code}`}>
              <Button>Order now</Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  };
  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full">
        <div className="h-fit w-3/4 mx-auto py-20">
          <Typography.Title className="text-center">
            <span className="!font-sf_pro">iPhone</span>
          </Typography.Title>
          <div className="h-full w-full py-10 grid grid-cols-4 gap-10">
            {!isEmpty(productsList) &&
              productsList["iPhone"].map((item: any, index: number) => (
                <div key={index}>
                  {renderProductCard({
                    code: item._id,
                    name: item.name,
                    description: item.description,
                    price: `From ${NumberToDollarFormat(item.lowest_price)}`,
                    srcImage: item.image,
                  })}
                </div>
              ))}
          </div>
          <Typography.Title className="text-center">
            <span className="!font-sf_pro">Mac</span>
          </Typography.Title>
          <div className="h-full w-full py-10 grid grid-cols-4 gap-10">
            {renderProductCard({
              code: "t",
              name: "iPhone 15 Pro Max",
              description: "The ultimate iPhone.",
              price: "From $1199",
              srcImage: iPhone15ProMax.src,
            })}
            {renderProductCard({
              code: "t",
              name: "iPhone 15 Pro",
              description: "The ultimate iPhone.",
              price: "From $999",
              srcImage: iPhone15Pro.src,
            })}
            {renderProductCard({
              code: "t",
              name: "iPhone 15",
              description: "A total powerhouse.",
              price: "From $799",
              srcImage: iPhone15.src,
            })}
            {renderProductCard({
              code: "t",
              name: "iPhone 14",
              description: "As amazing as ever.",
              price: "From $699",
              srcImage: iPhone14.src,
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
