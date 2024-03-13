import { Avatar, Divider, Flex, Spin } from "antd";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isEmpty, toString } from "lodash";
import { fetchDetailBlog } from "@/redux/entities/blogs/asyncThunk";
import { getDetailBlog } from "@/redux/selectors/blogs";
import { BlogType } from "@/models/blogModel";
import { CustomText } from "@/components/homePage/common";
import { WaitingLoading } from "@/helpers/renderHelpers";

export default function ProductDetailsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const blogCode: string = toString(router.query.code);
  const detailBlog = useAppSelector(getDetailBlog);
  const detailBlogData: BlogType = detailBlog.data;

  useEffect(() => {
    if (!isEmpty(blogCode))
      dispatch(fetchDetailBlog({ params: { idTitle: blogCode } }));
  }, [blogCode]);

  console.log(detailBlog);

  return (
    <>
      <main className={`h-fit w-full`}>
        <div className="h-full w-full flex justify-center items-center">
          <div className="h-fit w-full pb-12">
            {isEmpty(detailBlogData) ? (
              <WaitingLoading loading={detailBlog.loading} />
            ) : (
              <Spin spinning={detailBlog.loading}>
                <div className="h-[40em] w-full relative">
                  <motion.div
                    className="h-full w-full rounded-xl aspect-[9/16] bg-cover bg-center bg-no-repeat shadow-lg"
                    style={{
                      backgroundImage: `url(${process.env.MONGO_BE_URL}/${detailBlogData.images.thumbnail})`,
                      backgroundSize: "100%",
                    }}
                    whileHover={{ backgroundSize: "105%" }}
                    transition={{ ease: "easeInOut" }}
                  ></motion.div>
                  <div className="h-full w-full bg-black/20 backdrop-blur-md absolute top-0"></div>
                </div>
                <div className="h-fit w-11/12 lg:w-3/4 mx-auto pt-10 pb-20 relative -top-80 bg-white rounded-lg shadow-md">
                  <div className="h-fit w-full px-4 lg:px-10">
                    <Flex justify="center" align="center">
                      <Avatar
                        className="mx-auto bg-slate-200"
                        size={60}
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      />
                    </Flex>
                    <CustomText
                      type="paragraph"
                      topClass="!text-lg !text-center mt-4"
                      extraClass="!text-black"
                    >
                      <span className="font-semibold">
                        {detailBlogData.author.name}
                      </span>
                      <br />
                      {detailBlogData.author.role}
                    </CustomText>
                    <Divider />
                    <CustomText
                      type="paragraph"
                      topClass="!text-3xl !text-center"
                      extraClass="!text-black"
                    >
                      <span className="!font-semibold">
                        {detailBlogData.title}
                      </span>
                      <br />
                      <span className="!text-lg">
                        {detailBlogData.category}
                      </span>
                    </CustomText>
                    <div className="h-fit w-11/12 lg:w-3/4 mx-auto">
                      <CustomText
                        type="paragraph"
                        topClass="!text-lg"
                        extraClass="!text-black"
                      >
                        <div
                          className="leading-7"
                          dangerouslySetInnerHTML={{
                            __html: detailBlogData.content,
                          }}
                        ></div>
                      </CustomText>
                    </div>
                  </div>
                </div>
              </Spin>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
