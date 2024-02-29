import {
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { CustomButton } from "../common";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { UserType } from "@/models/userModel";
import { CustomText } from "../homePage/common";
import {
  FieldProfileInformationType,
  FieldProfilePasswordType,
} from "@/models/common";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateUserInformation,
  updateUserPassword,
} from "@/redux/entities/users/asyncThunk";
import { getUserChangingPasswordLoading } from "@/redux/selectors/user";
import { FormUpdatePassword } from "@/modules/profile/formUpdatePassword";
import { FormUpdateInformation } from "@/modules/profile/formUpdateInformation";

export const ProfileTab = ({ authenAccount }: { authenAccount: UserType }) => {
  const dispatch = useAppDispatch();

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
