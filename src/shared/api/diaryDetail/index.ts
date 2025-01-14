import { GetPostResponse, GetAuthorResponse } from "./type";
import { axiosInstance } from "../instance";

export const getPost = async (postId: number) => {
  const response = await axiosInstance.get<
  GetPostResponse
  >(`/post/${postId}`);
  console.log(response);
  return response.data.result;
}

export const getComments = async () => {

}

export const getAuthorInfo = async (memberId: number) => {
  const response = await axiosInstance.get<
  GetAuthorResponse
  >(`/member/profile/${memberId}`);
  console.log(response);
  return response.data.result;
}