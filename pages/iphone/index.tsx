import { Button, Card, Empty, Image, Spin, Typography } from "antd";
import { motion } from "framer-motion";
import { isEmpty, omit } from "lodash";
import { CustomText } from "@/components/homePage/common";
import { useEffect, useState } from "react";
import { NumberToDollarFormat } from "@/helpers/commonHelpers";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCategory, fetchProducts } from "@/redux/entities/products";
import { getCategory, getProducts } from "@/redux/selectors/products";
import { CategoryType, ProductsType } from "@/models/productModel";
import {
  CategoryDescriptionTabItem,
  RenderProductCard,
  renderTitle,
} from "@/components/common";
import { productDescriptionVariants } from "@/models/productDetailModel";
import DescriptionTabItem from "@/components/productDetailComponents/descriptionTab";
import { CategoryProducts } from "@/components/products/categoryProducts";
import { VideoPlayer, VideoPlayerYoutube } from "@/components/videoPlayer";

interface ParamsSeriesType {
  category?: string;
  name?: string;
}

export default function Home() {
  const dispatch = useAppDispatch();
  const productsList = useAppSelector(getProducts);
  const [paramsSeries, setParamsSeries] = useState<ParamsSeriesType>({
    category: "iPhone",
  });

  useEffect(() => {
    dispatch(fetchProducts({ params: paramsSeries }));
  }, [paramsSeries]);

  const onChangeProductSeries = (key: string) => {
    if (key === "All") setParamsSeries({ category: "iPhone" });
    else setParamsSeries({ category: "iPhone", name: key });
  };

  console.log(productsList);

  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full">
        <div className="h-fit w-3/4 mx-auto pt-10 pb-20 text-3xl">
          <VideoPlayerYoutube
            extraClass="rounded-xl"
            urlVideo={"https://www.youtube.com/embed/EcGXCJm3XMA"}
          />
          <CategoryProducts
            title="iPhone"
            productsList={productsList}
            productSeries={[
              {
                key: "All",
                label: "All",
              },
              {
                key: "iPhone 15",
                label: "iPhone 15 Series",
              },
              {
                key: "iPhone 14",
                label: "iPhone 14 Series",
              },
            ]}
            onChangeProductSeries={onChangeProductSeries}
            exploreMore={false}
          />
          {renderTitle({
            title: "What makes an iPhone an iPhone?",
            topClass: "!text-center mt-20",
          })}
          <div className="h-fit w-full mt-10">
            <CategoryDescriptionTabItem
              type="contain-image"
              title="iOS 17"
              content={[
                {
                  semiTitle: "",
                  text: "Every day. More extraordinary.",
                  image: "/images/common/category/iphone/ios_17.jpg",
                },
              ]}
            />
            <CategoryDescriptionTabItem
              type="contain-image-grey"
              title=""
              content={[
                {
                  text: "<b>Privacy. Very iPhone.</b><br><br>From Passcode to Privacy Report to Health apps, iPhone gives you control over what you share.",
                  semiTitle: "",
                  image: "/images/common/category/iphone/icon_apple_logo.png",
                },
              ]}
            />
            <CategoryDescriptionTabItem
              type="dual-contain-image-grey"
              title=""
              content={[
                {
                  text: "<b>Upgrading from an old iPhone?</b><br><br>Simply place your old iPhone next to the new one, and with a few taps, you can transfer your data completely automatically.",
                  semiTitle: "",
                  image: "/images/common/category/iphone/icon_iphone.png",
                },
                {
                  text: "<b>Switching to iPhone?</b><br><br>When you buy a new iPhone, the Move to iOS app helps you easily transfer photos, WhatsApp contacts, and more.",
                  semiTitle: "",
                  image: "/images/common/category/iphone/icon_ios.png",
                },
              ]}
            />
          </div>
        </div>
        <div className="h-fit w-full bg-neutral-100">
          <div className="h-fit w-3/4 mx-auto pt-16 pb-20">
            {renderTitle({
              title: "There are still many adorable items.",
              topClass: "!text-center",
            })}
            <CategoryDescriptionTabItem
              type="contain-image-split"
              title="MagSafe Accessories"
              content={[
                {
                  semiTitle:
                    "Attach a back cover, a magnetic leather wallet, or both.",
                  text: `A colorful accessory ecosystem, easy attachment,
                  and faster wireless charging. With countless
                  combinations, every style has a suitable accessory set.`,
                  image: "/images/common/category/iphone/magsafe.png",
                },
              ]}
            />
            <CategoryDescriptionTabItem
              type="contain-image-split"
              title="AppleTV+"
              content={[
                {
                  semiTitle:
                    "Buy an iPhone, get 3 months of free Apple TV+ subscription. ◊Refer to the legal disclaimer.",
                  text: `• New Apple Original movies and series released every month.<br>
                  • Watch online on the Apple TV app with Apple devices, smart TVs, controllers.<br>
                  • Share with up to five family members.<br>`,
                  image: "/images/common/category/iphone/apple_tv_plus.png",
                },
              ]}
            />
            <CategoryDescriptionTabItem
              type="contain-image-split"
              title="AppleCare+"
              content={[
                {
                  semiTitle: "Professional support, extended warranty.",
                  text: `✓ Apple-certified service<br>
                  ✓ Priority access to technical support<br>
                  ✓ Warranty coverage for unexpected damage incidents<br>`,
                  image: "/images/common/category/iphone/applecare.png",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
