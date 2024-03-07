import { CheckoutInformationType } from "@/models/orderModel";
import { ResponseBEType } from "@/models/common";
import axiosMongo from "@/network/axiosMongo";
import { BlogType } from "@/models/blogModel";

const blogService = {
  async fetchBlogs(args?: {
    params?: { category?: string };
  }): Promise<ResponseBEType<BlogType[]>> {
    const result = await axiosMongo.get(`/api/blogs`);
    return result.data as any;
  },
  async fetchDetailBlog(args?: {
    params?: { idTitle: string };
  }): Promise<ResponseBEType<BlogType>> {
    const result = await axiosMongo.get(`/api/blogs/${args.params.idTitle}`);
    return result.data as any;
  },
};

export default blogService;
