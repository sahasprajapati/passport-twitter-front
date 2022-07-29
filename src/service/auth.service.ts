import { axiosInstance, protectedAxiosInstance } from "../utils/axios.util";
import { logOut } from "../utils/log.util";
import { AuthDTO, Response } from "../utils/response";

export const loginService = async (
  username: string,
  password: string
): Promise<Response<AuthDTO>> => {
  const res = await axiosInstance
    .post<Response<AuthDTO>>("/auth/login", {
      username,
      password,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });

  return { ...res };
};

export const logoutService = async (): Promise<Response<AuthDTO>> => {
  const res = await protectedAxiosInstance()
    .get<Response<AuthDTO>>("/auth/logout")
    .then((res) => {
      console.log("res", res);
      logOut();
      return res.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });
  return { ...res };
};

export const signupService = async (
  username: string,
  password: string,
  repassword: string
): Promise<Response<AuthDTO>> => {
  const res = await axiosInstance
    .post<Response<AuthDTO>>("/auth/register", {
      username,
      password,
      repassword,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.response.data);
      return err.response.data;
    });

  console.log(res);

  return { ...res };
};
