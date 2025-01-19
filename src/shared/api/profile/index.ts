import { GetMemberProfileResponse, userInfoResponse, userInfo, patchTeckstackResponse, postPersonalProjectResponse, getPersonalDiaryResponse } from "./type";
import { axiosInstance } from "../instance";

export const getMemberProfile = async (memberId: string | undefined) => {
  const response = await axiosInstance.get<
  GetMemberProfileResponse
  >(`/member/profile/${memberId}`);

  return response.data.result;
}

export const getUserInfo = async () => {
  const response = await axiosInstance.get<userInfoResponse>(
    "/member/info"
  );

  return response.data.result;
}

export const putUserInfo = async (formData: userInfo | undefined) => {
  const response = await axiosInstance.put<userInfoResponse>(
    "/member/info",
    formData
  );

  return response.data.result;
}

export const patchTeckstackData = async (techstack_name: string | undefined) => {
  const response = await axiosInstance.patch<patchTeckstackResponse>(
    `member/techstack/${techstack_name}`
  );

  return response.data;
}

export const postPersonalProjectData = async (project_name: string | undefined) => {
  const response = await axiosInstance.post<postPersonalProjectResponse>(
    `project/create/${project_name}`
  );

  return response.data;
}

export const getPersonalDiaryData = async (memberId: string | undefined, page: number, size: number) => {
  const response = await axiosInstance.get<getPersonalDiaryResponse>(
    `post/member/${memberId}/paging?page=${page}&size=${size}`
  );

  return response.data.result;
}