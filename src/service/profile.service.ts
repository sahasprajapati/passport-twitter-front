import { axiosInstance, protectedAxiosInstance } from "../utils/axios.util";
import { getToken } from "../utils/log.util";
import { ProfileDTO, Response } from "../utils/response";

export const profileService = async (): Promise<Response<ProfileDTO>> => {
  const res = await protectedAxiosInstance()
    .get<Response<ProfileDTO>>("/profile")
    .then((res) => res.data)
    .catch((err) => {
      return err.response.data;
    });

  return { ...res };
};
