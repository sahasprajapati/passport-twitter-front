import * as yup from "yup";
export const signupSchema = yup
  .object({
    username: yup.string().required(),
    password: yup
      .string()
      .required()
      .min(6)
      .matches(
        /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/,
        "Password must be alphanumeric."
      ),
    repassword: yup
      .string()
      .required()
      .min(6)
      .matches(
        /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/,
        "Password must be alphanumeric."
      )
      .oneOf([yup.ref("password"), null], "Password must match"),
  })
  .required();
