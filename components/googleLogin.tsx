import React, { useState, useEffect, useCallback } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import _, { isEmpty } from "lodash";
import { Button, Form } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import {
  GoogleLoginCodeResponseType,
  GoogleProfileType,
} from "@/models/userModel";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUserInfoLoginGoogle } from "@/redux/entities/googleLogin";

function GoogleLoginLayout() {
  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState<GoogleProfileType>();

  const getResponseCode = useGoogleLogin({
    onSuccess: (codeResponse) => {
      loginGoogle(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const loginGoogle = useCallback(
    async (codeResponse: GoogleLoginCodeResponseType) => {
      if (!isEmpty(codeResponse.access_token)) {
        dispatch(fetchUserInfoLoginGoogle(codeResponse));
        // if (_.isEmpty(data)) {
        //   console.log("Failed");
        // } else {
        //   setProfile(data);
        // }
      }
    },
    [profile]
  );

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <>
      {profile ? (
        <Form.Item>
          <Button
            type="text"
            className="h-[2.8rem] w-full bg-[#ea4236] text-white"
            onClick={() => logOut()}
            icon={<GoogleOutlined />}
          >
            Logout
          </Button>
        </Form.Item>
      ) : (
        <Form.Item>
          <Button
            type="text"
            className="h-[2.8rem] w-full bg-[#ea4236] text-white"
            onClick={() => getResponseCode()}
            icon={<GoogleOutlined />}
          >
            Login with Google
          </Button>
        </Form.Item>
      )}
    </>
  );
}
export default GoogleLoginLayout;
