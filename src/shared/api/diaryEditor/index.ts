import { axiosMultiInstance } from "../instance";
import { postDiaryResponse } from "./type";

export const postDiary = async (formData: FormData) => {
  const response = await axiosMultiInstance.post<postDiaryResponse>(
    "/post",
    formData
  );
  return response.data;
};