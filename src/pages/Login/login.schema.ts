import * as yup from "yup";

export const loginSchema = yup
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
  })
  .required();
