import { GetPostResponse, GetAuthorResponse, GetIsFollowedResponse, ToggleFollowResponse, ToggleBookmarkResponse } from "./type";
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
  return response.data.result;
}

export const getIsFollowed = async (memberId: number) => {
  const response = await axiosInstance.get<
  GetIsFollowedResponse
  >(`/follow/${memberId}`);
  console.log(response);
  return response.data.result;
}

export const toggleFollow = async (memberId: number) => {
  const response = await axiosInstance.post<
  ToggleFollowResponse
  >(`/follow/${memberId}`);
  console.log(response);
  return response.data.result;
}

export const postBookmark = async (postId: number) => {
  const response = await axiosInstance.post<
  ToggleBookmarkResponse
  >(`/post/${postId}/bookmark`);
  console.log(response);
  return response.data.result;
}

export const deleteBookmark = async (postId: number) => {
  const response = await axiosInstance.delete<
  ToggleBookmarkResponse
  >(`/post/${postId}/bookmark`);
  console.log(response);
  return response.data.result;
}