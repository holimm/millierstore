import {
  FieldProfilePasswordType,
  FieldProfileInformationType,
  ResponseBEType,
} from "@/models/common";
import {
  UserType,
  UserAddressType,
  RegisterAccountType,
  ForgotPasswordAccountType,
} from "@/models/userModel";
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
  async verifyUserAccount(values: {
    emailVerifyToken: string;
  }): Promise<ResponseBEType<RegisterAccountType>> {
    try {
      const result = await axiosMongo.post(
        `/api/users/verifyUserAccount`,
        values
      );
      return result.data as any;
    } catch (err) {
      return err as any;
    }
  },
  async sendEmailResetPassword(
    values: ForgotPasswordAccountType
  ): Promise<ResponseBEType<ForgotPasswordAccountType>> {
    try {
      const result = await axiosMongo.post(
        `/api/users/sendEmailResetPassword`,
        values
      );
      return result.data as any;
    } catch (err) {
      return err as any;
    }
  },
  async resetPassword(
    values: ForgotPasswordAccountType
  ): Promise<ResponseBEType<ForgotPasswordAccountType>> {
    try {
      const result = await axiosMongo.post(
        `/api/users/verifyResetPassword`,
        values
      );
      return result.data as any;
    } catch (err) {
      return err as any;
    }
  },
  async createUserAccount(
    values: RegisterAccountType
  ): Promise<ResponseBEType<RegisterAccountType>> {
    try {
      const result = await axiosMongo.post(
        `/api/users/createUserAccount`,
        values
      );
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
  async createAddress(
    values: UserAddressType
  ): Promise<ResponseBEType<string>> {
    try {
      const { _id, ...address } = values;
      const result = await axiosMongo.post(
        `/api/users/createAddress/${values._id}`,
        address
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
  async deleteAddress(
    values: UserAddressType
  ): Promise<ResponseBEType<string>> {
    try {
      const { _id, ...address } = values;
      const result = await axiosMongo.put(
        `/api/users/deleteAddress/${values._id}`,
        address
      );
      return result.data as any;
    } catch (err) {
      return err as any;
    }
  },
};

export default userService;
