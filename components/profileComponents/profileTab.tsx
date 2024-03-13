import { Divider } from "antd";
import { UserType } from "@/models/userModel";
import { CustomText } from "../homePage/common";
import { FormUpdatePassword } from "@/modules/profile/formUpdatePassword";
import { FormUpdateInformation } from "@/modules/profile/formUpdateInformation";

export const ProfileTab = ({ authenAccount }: { authenAccount: UserType }) => {
  return (
    <>
      <CustomText type="title">Profile</CustomText>
      <CustomText type="paragraph" extraClass="text-2xl !text-black">
        My personal information
      </CustomText>
      <Divider />
      <FormUpdateInformation authenAccount={authenAccount} />
      <CustomText type="paragraph" extraClass="text-2xl !text-black">
        Password
      </CustomText>
      <Divider />
      <FormUpdatePassword authenAccount={authenAccount} />
    </>
  );
};
