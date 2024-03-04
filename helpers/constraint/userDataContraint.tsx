export const fullnameConstraint: any = [
  {
    required: true,
    message: "*Please input your fullname",
  },
  {
    max: 50,
    message: "*Fullname can only contain maximum 50 characters",
  },
  {
    pattern: /^[\p{L}']+(?: [\p{L}']+)+$/u,
    message: "*Please input valid fullname",
  },
];

export const usernameConstraint: any = [
  {
    required: true,
    message: "*Please input your username",
  },
  {
    min: 5,
    max: 30,
    message:
      "*Username must contain minimum 8 characters, maximum 30 characters",
  },
  {
    pattern: /^[a-zA-Z0-9]{5,30}$/,
    message: <>*Must be alphanumeric characters</>,
  },
];

export const passwordConstraint: any = [
  {
    required: true,
    message: "*Please input your password",
  },
  {
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: (
      <>
        *Password must contain minimum 8 characters
        <br />
        *At least one uppercase letter, one lowercase letter, one number and one
        special character
      </>
    ),
  },
];

export const confirmPasswordConstraint: any = [
  {
    required: true,
    message: "*Please confirm your password",
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("*The two passwords that you entered do not match!")
      );
    },
  }),
];

export const emailConstraint: any = [
  {
    required: true,
    message: "*Please input your email address",
  },
  {
    type: "email",
    message: "*Please input valid email address",
  },
];

export const phoneConstraint: any = [
  {
    required: true,
    message: "*Please input your phone number",
  },
  {
    pattern: /^\d{10}$/,
    message: "*Phone number must contains 10 numbers",
  },
];
