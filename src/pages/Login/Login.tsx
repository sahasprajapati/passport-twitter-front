import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CustomButton } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { Splash } from "../../components/Splash/Splash";
import { loginService } from "../../service/auth.service";
import { isLoggedIn, saveLogIn } from "../../utils/log.util";
import { loginSchema } from "./login.schema";
import "./login.css";
export interface ILoginFormInputs {
  username: string;
  password: string;
}

export const Login = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const onSubmit = async (formData: ILoginFormInputs) => {
    setLoading(true);
    const { success, data, message } = await loginService(
      formData.username,
      formData.password
    );
    if (success) {
      saveLogIn(data?.token as string);
      setLoading(false);

      navigate("/");
    }
  };

  const handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    window.open("http://localhost:4000/auth/twitter", "_self");
  };

  useEffect(() => {
    if (token) {
      console.log("TK", token);
      saveLogIn(token);
      navigate("/");
    } else {
      if (isLoggedIn()) {
        navigate("/");
      }
      setLoading(false);
    }
  }, []);

  return loading ? (
    <Splash />
  ) : (
    <div className="">
      <h3>Login</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="username"
          error={errors.username?.message}
          register={register}
        />
        <PasswordInput
          name="password"
          error={errors.password?.message}
          register={register}
        />
        <CustomButton variant="custom" type="submit">
          Login
        </CustomButton>

        <CustomButton variant="twitter" onClick={handleSignInClick}>
          Login with twitter <i className="fab fa-twitter"></i>
        </CustomButton>

        {loading && <i className="fa fa-spinner" aria-hidden="true"></i>}
      </Form>
    </div>
  );
};
