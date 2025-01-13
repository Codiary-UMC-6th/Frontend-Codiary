import { GetProfileResponse } from "./type";
import { axiosPublicInstance } from "../instance";

export const getProfile = async (memberId: number) => {
  const response = await axiosPublicInstance.get<
    GetProfileResponse
  >(`/member/profile/${memberId}`);

  return response.data.result;
}