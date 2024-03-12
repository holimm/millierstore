import { motion } from "framer-motion";
import { CustomText } from "@/components/homePage/common";
import { BlogType } from "@/models/blogModel";
import { fetchBlogs } from "@/redux/entities/blogs/asyncThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getBlogs } from "@/redux/selectors/blogs";
import { Card, Flex, Image, Spin, Typography } from "antd";
import { chunk, isEmpty } from "lodash";
import Link from "next/link";
import { useEffect } from "react";
import { BlogPane } from "@/modules/blogs/blogPane";

export default function Home() {
  const dispatch = useAppDispatch();
  const blogsList = useAppSelector(getBlogs);
  const blogListData = chunk(blogsList.data, 5);
  console.log(blogListData);

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
          <Spin spinning={blogsList.loading}>
            {blogListData.map((item: BlogType[], index: number) => (
              <>
                <div className="h-fit w-full grid grid-cols-3 first:mt-0 mt-10 gap-10">
                  {!isEmpty(item[0]) && <BlogPane blogItem={item[0]} />}
                  {!isEmpty(item[1]) && <BlogPane blogItem={item[1]} />}
                  {!isEmpty(item[2]) && <BlogPane blogItem={item[2]} />}
                </div>
                <div className="h-fit w-full grid grid-cols-2 mt-10 gap-10">
                  {!isEmpty(item[3]) && <BlogPane blogItem={item[3]} />}
                  {!isEmpty(item[4]) && <BlogPane blogItem={item[4]} />}
                </div>
              </>
            ))}
          </Spin>
        </div>
      </div>
    </main>
  );
}
