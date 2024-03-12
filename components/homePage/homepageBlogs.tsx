import { BlogType } from "@/models/blogModel";
import { BlogPane } from "@/modules/blogs/blogPane";
import { Spin, Typography } from "antd";
import { chunk, first, isEmpty } from "lodash";

export const HomepageBlogs = ({
  blogsList,
}: {
  blogsList: {
    data: BlogType[];
    loading: any;
  };
}) => {
  const blogListData = first(chunk(blogsList.data, 5));
  return (
    <>
      <Typography.Title className="text-center">
        <span className="!font-sf_pro">Blogs</span>
      </Typography.Title>
      <Typography.Paragraph className="text-center text-lg">
        <span className="!font-sf_pro_text_light">
          Stay up to date with the latest blog posts
        </span>
      </Typography.Paragraph>
      <Spin spinning={blogsList.loading}>
        <div className="h-fit w-full pt-10 pb-32">
          {!isEmpty(blogListData) && (
            <>
              <div className="h-fit w-full grid grid-cols-3 first:mt-0 mt-10 gap-10">
                {!isEmpty(blogListData[0]) && (
                  <BlogPane blogItem={blogListData[0]} />
                )}
                {!isEmpty(blogListData[1]) && (
                  <BlogPane blogItem={blogListData[1]} />
                )}
                {!isEmpty(blogListData[2]) && (
                  <BlogPane blogItem={blogListData[2]} />
                )}
              </div>
              <div className="h-fit w-full grid grid-cols-2 mt-10 gap-10">
                {!isEmpty(blogListData[3]) && (
                  <BlogPane blogItem={blogListData[3]} />
                )}
                {!isEmpty(blogListData[4]) && (
                  <BlogPane blogItem={blogListData[4]} />
                )}
              </div>{" "}
            </>
          )}
        </div>
      </Spin>
    </>
  );
};
