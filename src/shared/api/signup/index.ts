import { axiosPublicInstance } from "../instance";
import { postSignUpUserInfoRequest } from "./type";
import { baseResponse } from "@/shared/api/common/type";

export const postSignup = async (formData: postSignUpUserInfoRequest) => {
  const response = await axiosPublicInstance.post<postSignUpUserInfoRequest>(
    "/auth/sign_up",
    formData
  );
  return response.data;
};

export const getCheckEmail = async (email: string) => {
  const response = await axiosPublicInstance.get<baseResponse>(
    `/auth/sign_up/email/check?email=${email}`
  );
  return response.data;
};

export const getCheckNickname = async (nickname: string) => {
  const response = await axiosPublicInstance.get<baseResponse>(
    `/auth/sign_up/nickname/check?nickname=${nickname}`
  );
  return response.data;
};
