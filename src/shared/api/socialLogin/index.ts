import { AxiosResponse } from "axios";

import {
  GetRedirectionURLResponse,
  PostKakaoAuthRequest,
  PostKakaoAuthResponse,
} from "@/shared/api/socialLogin/type";
import { axiosPublicInstance } from "@/shared/api/instance";

export const getKakaoRedirectionURL = async () => {
  const response = await axiosPublicInstance.get<GetRedirectionURLResponse>(
    `/oauth/login/kakao_url`
  );
  return response.data;
};

export const postKakaoLogin = async (code: string) => {
  const response = await axiosPublicInstance.post<
    PostKakaoAuthRequest,
    AxiosResponse
  >(`/oauth/login/kakao?code=${code}`);
  return response.data;
};
