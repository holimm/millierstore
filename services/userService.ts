import {
  FieldProfilePasswordType,
  FieldProfileInformationType,
  ResponseBEType,
} from "@/models/common";
import { UserType, UserAddressType } from "@/models/userModel";
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
  async updateInformation(
    values: FieldProfileInformationType
  ): Promise<ResponseBEType<string>> {
    try {
      const { _id, ...information } = values;
      const result = await axiosMongo.put(
        `/api/users/updateInformation/${values._id}`,
        information
      );
      return result.data as any;
    } catch (err) {
      return err as any;
    }
  },
  async updatePassword(
    values: FieldProfilePasswordType
  ): Promise<ResponseBEType<string>> {
    try {
      const result = await axiosMongo.put(
        `/api/users/updatePassword/${values._id}`,
        values
      );
      return result.data as any;
    } catch (err) {
      return err as any;
    }
  },
  async updateAddress(
    values: UserAddressType
  ): Promise<ResponseBEType<string>> {
    try {
      const { _id, ...address } = values;
      const result = await axiosMongo.put(
        `/api/users/updateAddress/${values._id}`,
        address
      );
      return result.data as any;
    } catch (err) {
      return err as any;
    }
  },
};

export default userService;
