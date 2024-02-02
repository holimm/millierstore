import { ResponseBEType } from "@/models/common";
import { UserType } from "@/models/userModel";
import axiosMongo from "@/network/axiosMongo";

const userService = {
  async signIn(values: UserType): Promise<ResponseBEType<UserType>> {
    try {
      const result = await axiosMongo.post(`/api/users/signin`, values);
      return result.data as any;
    } catch (err) {
      return err as any;
    }
  },
  async sessionSignIn(token: string): Promise<ResponseBEType<UserType>> {
    try {
      const result = await axiosMongo.get(`/api/users/sessionSignIn`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return result.data as any;
    } catch (err) {
      return err as any;
    }
  },
};

export default userService;
