import { GetPostsResponse } from "./type";
import { axiosInstance, axiosPublicInstance } from "../instance";

export const getPosts = async (page: number, size: number, sort: string) => {
  const response = await axiosPublicInstance.get<
    GetPostsResponse
  >(`/post/list?page=${page}&size=${size}&sort=${sort}`);
  console.log(response);
  return response.data.result;
}

export const getBookmarkPosts = async (page: number, size: number, sort: string) => {
  const response = await axiosInstance.get<
    GetPostsResponse
  >(`/post/bookmark/paging?page=${page}&size=${size}&sort=${sort}`);
  console.log(response);
  return response.data.result;
}
