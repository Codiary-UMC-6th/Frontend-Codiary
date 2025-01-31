import { axiosInstance } from "../instance";
import { postSignUpUserInfoRequest, postDiaryResponse } from "./type";

export const postDiary = async (formData: postSignUpUserInfoRequest) => {
  const response = await axiosInstance.post<postDiaryResponse>(
    "/post",
    formData
  );
  return response.data;
};