import { CategoryType } from "@/models/productModel";
import { Spin, Typography } from "antd";
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
    </>
  );
};
