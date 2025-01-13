import { GetPostResponse } from "./type";
import { axiosInstance } from "../instance";

export const getPost = async (postId: number) => {
  const response = await axiosInstance.get<
  GetPostResponse
  >(`/post/${postId}`);
  console.log(response);
  return response.data.result;
}