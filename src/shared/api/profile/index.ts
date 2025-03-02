import { GetMemberProfileResponse, userInfoResponse, userInfo, patchTeckstackResponse, postPersonalProjectResponse, getPersonalDiaryResponse, getMyProjectResponse, userProfileImgResponse, getProjectResponse, getMyTeamListResponse } from "./type";
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

  return response.data;
}

export const patchTeckstackData = async (techstack_name: string | undefined) => {
  const response = await axiosInstance.patch<patchTeckstackResponse>(
    `member/techstack/${techstack_name}`
  );

  return response.data;
}

export const postMyProjectData = async (project_name: string | undefined) => {
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

export const getMyProjectData = async () => {
  const response = await axiosInstance.get<getMyProjectResponse>(
    'project/my'
  );

  return response.data.result;
}

export const patchUserProfileImage = async (formData: FormData | undefined) => {
  const response = await axiosInstance.patch<userProfileImgResponse>(
    'member/profile-image',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data', // 직접 지정하지 않는 것이 일반적으로 안전함
      },
    }
  );

  return response.data;
}

export const getUserProfileImage = async () => {
  const response = await axiosInstance.get<userProfileImgResponse>(
    'member/profile-image'
  );

  return response.data.result;
}

export const getProjectData = async (memberId: string | undefined) => {
  const response = await axiosInstance.get<getProjectResponse>(
    `project/${memberId}`
  );

  return response.data.result;
}

export const getMyTeamListData = async (memberId: string | undefined) => {
  const response = await axiosInstance.get<getMyTeamListResponse>(
    `team/${memberId}/myTeam`
  );

  return response.data.result;
}