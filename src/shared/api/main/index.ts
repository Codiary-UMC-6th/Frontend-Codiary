import { GetPostsResponse } from "./type";
import { axiosPublicInstance } from "../instance";

export const getPosts = async (page: number, size: number, sort: string) => {
  const response = await axiosPublicInstance.get<
    GetPostsResponse
  >(`/post/list?page=${page}&size=${size}&sort=${sort}`);
  console.log(response);
  return response.data.result;
}