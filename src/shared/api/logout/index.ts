import { EmptyResponse } from "@/shared/api/generalResponse";
import { axiosPublicInstance } from "@/shared/api/instance";
import { PostLogoutRequest } from "@/shared/api/logout/type";
import { AxiosResponse } from "axios";

export const postLogout = async (data: PostLogoutRequest) => {
  const response = await axiosPublicInstance.post<
    PostLogoutRequest,
    AxiosResponse<EmptyResponse>
  >(`/auth/logout`, data);

  return response.data;
};
