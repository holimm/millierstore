import { BlogType } from "@/models/blogModel";
import { fetchBlogs } from "@/redux/entities/blogs/asyncThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getBlogs } from "@/redux/selectors/blogs";
import { Card, Image, Spin, Typography } from "antd";
import { isEmpty } from "lodash";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const blogsList = useAppSelector(getBlogs);
  const blogListData = blogsList.data;

  useEffect(() => {
    dispatch(fetchBlogs({}));
  }, []);

  return (
    <main className={`h-fit w-full`}>
      <div className="h-fit w-full">
        <div className="h-fit w-3/4 mx-auto py-20">
          <Typography.Title className="text-start">
            <span className="!font-sf_pro !text-black">News</span>
          </Typography.Title>
          <div className="h-fit w-full pt-10 pb-40 grid grid-cols-3 gap-10">
            <Spin spinning={blogsList.loading}>
              {!isEmpty(blogListData) &&
                blogListData.map((item: BlogType, index: number) => (
                  <Link href={`/blogs/${item.idTitle}`}>
                    <Card
                      className="shadow-md cursor-pointer"
                      cover={
                        <div className="pt-2 px-2">
                          <Image
                            src={`${process.env.MONGO_BE_URL}/${item.images.thumbnail}`}
                            preview={false}
                          ></Image>
                        </div>
                      }
                      hoverable
                    >
                      <Typography.Paragraph ellipsis={{ rows: 2 }}>
                        <span className={"!text-xl !text-black !font-semibold"}>
                          {item.title}
                        </span>
                      </Typography.Paragraph>
                      <Typography.Paragraph ellipsis={{ rows: 3 }}>
                        <span className={"!text-lg !text-black"}>
                          {item.chapeau}
                        </span>
                      </Typography.Paragraph>
                    </Card>
                  </Link>
                ))}
            </Spin>
          </div>
        </div>
      </div>
    </main>
  );
}
