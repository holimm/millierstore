import { BlogType } from "@/models/blogModel";
import { Flex, Typography } from "antd";
import Link from "next/link";

export const BlogPane = ({ blogItem }: { blogItem: BlogType }) => {
  return (
    <div className="h-fit w-full p-1 border-[1px] bg-neutral-200/50 rounded-xl shadow-xl">
      <Link href={`/blogs/${blogItem.idTitle}`}>
        <div
          className="h-[30em] w-full bg-cover bg-center bg-no-repeat rounded-xl relative"
          style={{
            backgroundImage: `url(${process.env.MONGO_BE_URL}/${blogItem.images.thumbnail})`,
          }}
        >
          <div className="h-1/2 w-full bg-gradient-to-t from-black/80 from-[50%] via-black/50 to-transparent backdrop-blur-sm rounded-b-xl absolute bottom-0">
            <Flex className="h-full w-full px-6" justify="start" align="center">
              <div className="h-fit w-full mt-4">
                <Typography.Paragraph ellipsis={{ rows: 2 }}>
                  <span
                    className={
                      "!text-xl !text-white !font-bold !font-sf_pro_text_light"
                    }
                  >
                    {blogItem.title}
                  </span>
                </Typography.Paragraph>
                <Typography.Paragraph ellipsis={{ rows: 3 }}>
                  <span
                    className={"!text-lg !text-white !font-sf_pro_text_light"}
                  >
                    {blogItem.chapeau}
                  </span>
                </Typography.Paragraph>
              </div>
            </Flex>
          </div>
        </div>
      </Link>
    </div>
  );
};
