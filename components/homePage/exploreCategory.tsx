import { CategoryType } from "@/models/productModel";
import { Carousel, Spin, Typography } from "antd";
import { CategoryCard } from "./common";

export const HomepageExploreCategory = ({
  categoryList,
}: {
  categoryList: {
    data: CategoryType[];
    loading: any;
  };
}) => {
  return (
    <>
      <Typography.Paragraph className="text-center text-3xl lg:text-4xl font-semibold">
        <span className="!font-sf_pro">Explore Categories</span>
      </Typography.Paragraph>
      <Typography.Paragraph className="text-center text-lg">
        <span className="!font-sf_pro_text_light">
          Discover diverse categories for a personalized shopping experience
        </span>
      </Typography.Paragraph>
      <Spin spinning={categoryList.loading}>
        <div className="h-fit w-full block lg:hidden my-10">
          <Carousel draggable>
            {categoryList.data.map((item: CategoryType, index) => (
              <CategoryCard
                key={index}
                label={item.name}
                src={`${process.env.MONGO_BE_URL}${item.image}`}
              />
            ))}
          </Carousel>
        </div>
        <div className="h-fit w-full hidden lg:block">
          <div className="h-fit w-full mx-auto mt-10 grid grid-cols-3 gap-2 lg:gap-20">
            {categoryList.data.map((item: CategoryType, index) => (
              <CategoryCard
                key={index}
                label={item.name}
                src={`${process.env.MONGO_BE_URL}${item.image}`}
              />
            ))}
          </div>
        </div>
      </Spin>
    </>
  );
};
