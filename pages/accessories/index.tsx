import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/entities/products";
import { getProducts } from "@/redux/selectors/products";
import { CategoryAccessoriesImageCard, renderTitle } from "@/components/common";
import { CategoryProducts } from "@/components/products/categoryProducts";
import { VideoPlayerYoutube } from "@/components/videoPlayer";
import { Carousel, Grid } from "antd";

const { useBreakpoint } = Grid;

interface ParamsSeriesType {
  category?: string;
  name?: string;
}

export default function CategoryAccessories() {
  const dispatch = useAppDispatch();
  const screenSize = useBreakpoint();
  const productsList = useAppSelector(getProducts);
  const [paramsSeries, setParamsSeries] = useState<ParamsSeriesType>({
    category: "Accessories",
  });

  useEffect(() => {
    dispatch(fetchProducts({ params: paramsSeries }));
  }, [paramsSeries]);

  const onChangeProductSeries = (key: string) => {
    if (key === "All") setParamsSeries({ category: "Accessories" });
    else setParamsSeries({ category: "Accessories", name: key });
  };

  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full">
        <div className="h-fit w-11/12 lg:w-3/4 mx-auto pt-10 pb-20 text-3xl">
          <VideoPlayerYoutube
            extraClass="rounded-xl"
            urlVideo={"https://www.youtube.com/embed/ql6mhhHCldY"}
          />
          <CategoryProducts
            title="Accessories"
            productsList={productsList}
            productSeries={[
              {
                key: "All",
                label: "All",
              },
              {
                key: "airpods",
                label: "Airpods",
              },
            ]}
            onChangeProductSeries={onChangeProductSeries}
            exploreMore={false}
          />
        </div>
        <div className="h-fit w-full bg-neutral-100">
          <div className="h-fit w-11/12 lg:w-3/4 mx-auto pt-12 lg:pt-1 pb-20">
            {renderTitle({
              title: "A magical connection to your devices.",
              topClass: "!text-center mt-2 lg:mt-20",
            })}
            <Carousel
              className="my-16"
              slidesToShow={screenSize.xs ? 1 : screenSize.lg && 3}
              infinite={false}
              draggable
            >
              <CategoryAccessoriesImageCard
                title="One-tap setup"
                textColor="!text-black"
                content={[
                  {
                    text: "Connect immediately to your iPhone or iPad.",
                    image:
                      "/images/common/category/accessories/one_tap_setup_card.jpg",
                  },
                ]}
              />
              <CategoryAccessoriesImageCard
                title="Personalized Spatial Audio"
                textColor="!text-black"
                content={[
                  {
                    text: "Personalized Spatial Audio plays three-dimensional sound tuned for your specific ear shape — across all your devices.",
                    image:
                      "/images/common/category/accessories/spatial_audio_card.jpg",
                  },
                ]}
              />
              <CategoryAccessoriesImageCard
                title="Audio Sharing"
                textColor="!text-black"
                content={[
                  {
                    text: "Share a song, podcast, or other audio between two sets of AirPods with Audio Sharing",
                    image:
                      "/images/common/category/accessories/audio_sharing_card.jpg",
                  },
                ]}
              />
              <CategoryAccessoriesImageCard
                title="Automatic Switching"
                textColor="!text-black"
                content={[
                  {
                    text: "Automatic Switching is now significantly faster and more reliable between your iPhone, iPad, and Mac, and easily moves to your Apple Watch. So if you’re playing music on your Mac, you can answer a call on your iPhone — without having to switch devices.",
                    image:
                      "/images/common/category/accessories/auto_switch_card.jpg",
                  },
                ]}
              />
              <CategoryAccessoriesImageCard
                title="Siri"
                textColor="!text-black"
                content={[
                  {
                    text: "A simple “Hey Siri” summons your favorite personal assistant. Control your music, calls, volume, directions, and more — without lifting a finger.",
                    image: "/images/common/category/accessories/siri_card.jpg",
                  },
                ]}
              />
              <CategoryAccessoriesImageCard
                title="Accessibility"
                textColor="!text-black"
                content={[
                  {
                    text: "AirPods are loaded with features to assist with select hearing needs, from focusing on the voice in front of you in noisy surroundings to amplifying the frequencies you may need to hear more clearly.",
                    image:
                      "/images/common/category/accessories/accessibility_card.jpg",
                  },
                ]}
              />
            </Carousel>
          </div>
        </div>
      </div>
    </main>
  );
}
