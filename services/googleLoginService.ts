import { ResponseBEType } from "@/models/common";
import { ProductDetailType } from "@/models/productDetailModel";
import { CategoryType } from "@/models/productModel";
import {
  GoogleLoginCodeResponseType,
  GoogleProfileType,
  UserType,
} from "@/models/userModel";
import axiosMongo from "@/network/axiosMongo";
import axios from "axios";
import { isEmpty } from "lodash";

const googleLoginService = {
  async fetchUserInfoLoginGoogle(
    values: GoogleLoginCodeResponseType
  ): Promise<ResponseBEType<UserType>> {
    const resultGoogle = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${values.access_token}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${values.access_token}`,
        },
      }
    );
    const result = await axiosMongo.post(
      `/api/users/googleLogin`,
      resultGoogle.data
    );
    return result.data as any;
  },
};

export default googleLoginService;
