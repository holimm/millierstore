import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/entities/products";
import { getProducts } from "@/redux/selectors/products";
import {
  CategoryDescriptionTabItem,
  CategoryMacImageCard,
  renderTitle,
} from "@/components/common";
import { CategoryProducts } from "@/components/products/categoryProducts";
import { VideoPlayerYoutube } from "@/components/videoPlayer";
import { Carousel, Grid } from "antd";

const { useBreakpoint } = Grid;

interface ParamsSeriesType {
  category?: string;
  name?: string;
}

export default function CategoryMac() {
  const dispatch = useAppDispatch();
  const screenSize = useBreakpoint();
  const productsList = useAppSelector(getProducts);
  const [paramsSeries, setParamsSeries] = useState<ParamsSeriesType>({
    category: "Mac",
  });

  useEffect(() => {
    dispatch(fetchProducts({ params: paramsSeries }));
  }, [paramsSeries]);

  const onChangeProductSeries = (key: string) => {
    if (key === "All") setParamsSeries({ category: "Mac" });
    else setParamsSeries({ category: "Mac", name: key });
  };

  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full">
        <div className="h-fit w-11/12 lg:w-3/4 mx-auto pt-10 pb-20 text-3xl">
          <VideoPlayerYoutube
            extraClass="rounded-xl"
            urlVideo={"https://www.youtube.com/embed/0pg_Y41waaE"}
          />
          <CategoryProducts
            title="Mac"
            productsList={productsList}
            productSeries={[
              {
                key: "All",
                label: "All",
              },
              {
                key: "macbookpro14_m3",
                label: "Macbook Pro M3 Series",
              },
            ]}
            onChangeProductSeries={onChangeProductSeries}
            exploreMore={false}
          />
          {renderTitle({
            title: "Get to know Mac.",
            topClass: "!text-center mt-2 lg:mt-20",
          })}
          <div className="h-fit w-full mt-10">
            <Carousel
              slidesToShow={screenSize.xs ? 1 : screenSize.lg && 3}
              infinite={false}
              draggable
              autoplay
            >
              <CategoryMacImageCard
                title="Getting Started"
                textColor="!text-white"
                content={[
                  {
                    text: "Easy to use. Easy to love.",
                    image: "/images/common/category/mac/hello_card.jpg",
                  },
                ]}
              />
              <CategoryMacImageCard
                title="Performance and Battery Life"
                textColor="!text-white"
                content={[
                  {
                    text: "Go fast. Go far.",
                    image: "/images/common/category/mac/performance_card.jpg",
                  },
                ]}
              />
              <CategoryMacImageCard
                title="Mac and iPhone"
                textColor="!text-black"
                content={[
                  {
                    text: "Dream team.",
                    image: "/images/common/category/mac/dream_team_card.jpg",
                  },
                ]}
              />
              <CategoryMacImageCard
                title="Compatibility"
                textColor="!text-black"
                content={[
                  {
                    text: "Mac runs your favorite apps.",
                    image: "/images/common/category/mac/compability_card.jpg",
                  },
                ]}
              />
              <CategoryMacImageCard
                title="Privacy and Security"
                textColor="!text-white"
                content={[
                  {
                    text: "Your business is nobody else’s.",
                    image: "/images/common/category/mac/privacy_card.jpg",
                  },
                ]}
              />
              <CategoryMacImageCard
                title="Durability"
                textColor="!text-black"
                content={[
                  {
                    text: "Built to stand the test of time.",
                    image: "/images/common/category/mac/durability_card.jpg",
                  },
                ]}
              />
              <CategoryMacImageCard
                title="Apple Values"
                textColor="!text-black"
                content={[
                  {
                    text: "Our values drive everything we do.",
                    image: "/images/common/category/mac/value_card.jpg",
                  },
                ]}
              />
            </Carousel>
          </div>
        </div>
        <div className="h-fit w-full bg-white">
          <div className="h-fit w-11/12 lg:w-3/4 mx-auto pt-2 lg:pt-16 pb-20">
            {renderTitle({
              title: "There are still many adorable items.",
              topClass: "!text-center",
            })}
            <CategoryDescriptionTabItem
              type="contain-image-split-grey"
              title="Mac and iPhone"
              content={[
                {
                  semiTitle: "Enhanced connectivity across Mac and iPhone.",
                  text: `You can answer calls or messages from your iPhone directly on your Mac. Copy images, video, or text on your iPhone, then paste into another app on your nearby Mac. With iCloud, you can access your favorite files from either your iPhone or your Mac. And so much more.`,
                  image: "/images/common/category/mac/mac_to_iphone.jpg",
                },
              ]}
            />
            <CategoryDescriptionTabItem
              type="contain-image-split-grey"
              title="Mac accessories"
              content={[
                {
                  semiTitle: "Accessories tailored for Mac users.",
                  text: `Explore keyboards, mice, and other essentials.<br><br><a href="/accessories">Shop Mac accessories</a>`,
                  image: "/images/common/category/mac/mac_accessories.jpg",
                },
              ]}
            />
            <CategoryDescriptionTabItem
              type="contain-image-split-grey"
              title="Studio Display"
              content={[
                {
                  semiTitle: "Stunning display for creative professionals.",
                  text: `The 27-inch 5K Retina display pairs beautifully with any Mac.`,
                  image: "/images/common/category/mac/studio_display.jpg",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
