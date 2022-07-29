import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CustomButton } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { Splash } from "../../components/Splash/Splash";
import { signupService } from "../../service/auth.service";
import { isLoggedIn, saveLogIn } from "../../utils/log.util";
import { signupSchema } from "./signup.schema";
export interface ISignupFormInputs {
  username: string;
  password: string;
  repassword: string;
}

export const SignUp = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignupFormInputs>({
    resolver: yupResolver(signupSchema),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = async (formData: ISignupFormInputs) => {
    setLoading(true);

    const { success, data, message } = await signupService(
      formData.username,
      formData.password,
      formData.repassword
    );
    console.log(success);
    if (success) {
      saveLogIn(data?.token as string);
      setLoading(false);

      navigate("/");
    } else {
      setLoading(false);

      setError(message);
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
    setLoading(false);
    reset({
      username: username || "",
      password: "",
      repassword: "",
    });
  }, []);
  return loading ? (
    <Splash />
  ) : (
    <div>
      <h3>Signup </h3>
      {error.length > 0 && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name="username"
          error={errors.username?.message}
          disabled={username ? true : false}
        />
        <PasswordInput
          register={register}
          error={errors.password?.message}
          name="password"
        />
        <PasswordInput
          register={register}
          error={errors.repassword?.message}
          name="repassword"
        />

        <CustomButton variant="custom" type="submit">
          Sign up
        </CustomButton>

        {loading && <i className="fa fa-spinner" aria-hidden="true"></i>}
      </Form>
    </div>
  );
};
