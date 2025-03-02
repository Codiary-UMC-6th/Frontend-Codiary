import { baseResponse } from "../common/type";
import { axiosInstance, axiosPublicInstance } from "../instance";
import { AddTeamData, TeamInfoResponse, getTeamProfileResponse, getTeamListResponse, getTeamDiaryResponse, getTeamProjectResponse, getTeamFollowedResponse, ToggleFollowResponse, getUserInfoByNicknameResponse, postTeamMemberResponse, teamMember, teamMemberData } from "./type";

export const postTeam = async (formData: AddTeamData) => {
  const response = await axiosInstance.post<TeamInfoResponse>(
    '/team',
    formData
  )
  
    return response.data.result;
}

export const getCheckTeamName = async (teamName: string) => {
  const response = await axiosInstance.get<baseResponse>(
    `/team/check_duplicate?team_name=${teamName}`
  )
  return response.data;
}

export const getTeamInfo = async (teamId: string | undefined) => {
  const response = await axiosInstance.get<TeamInfoResponse>(
    `/team/${teamId}`
  )

  return response.data.result;
}

export const getTeamProfile = async (teamId: string | undefined) => {
  const response = await axiosInstance.get<getTeamProfileResponse>(
    `/team/profile/${teamId}`
  )

  return response.data.result;
}

export const putTeamProfile = async (teamId: string | undefined, formData: AddTeamData) => {
  const response = await axiosInstance.put<TeamInfoResponse>(
    `team/${teamId}`,
    formData
  )

  return response.data;
}

export const getTeamList = async () => {
  const response = await axiosInstance.get<getTeamListResponse>(
    '/team/list'
  )

  return response.data.result;
}

export const getTeamDiaryData = async (teamId: string | undefined, page: number, size: number) => {
  const response = await axiosInstance.get<getTeamDiaryResponse>(
    `post/member/${teamId}/paging?page=${page}&size=${size}`
  );

  return response.data.result;
}

export const getTeamProjectData = async (teamId: string | undefined) => {
  const response = await axiosInstance.get<getTeamProjectResponse>(
    `project/team/${teamId}`
  );

  return response.data.result;
}

export const getTeamFollowedData = async (teamId: number | undefined) => {
  const response = await axiosInstance.get<getTeamFollowedResponse>(
    `follow/team/${teamId}`
  );

  return response.data.result;
}

export const toggleTeamFollow = async (teamId: number | undefined) => {
  const response = await axiosInstance.post<ToggleFollowResponse>(
    `/follow/team/${teamId}`
  );

  return response.data.result;
}

export const getUserInfoByNickname = async (nickname: string) => {
  const response = await axiosInstance.get<getUserInfoByNicknameResponse>(
    `/member/all?nickname=${nickname}`
  );

  return response.data.result;
}

export const postTeamMember = async (teamId: string | undefined, member_nick_name: string, member_position: string) => {
  const response = await axiosInstance.post<postTeamMemberResponse>(
    `/team/team_member?team_id=${teamId}`,
    {
      "member_nick_name": member_nick_name,
      "member_role": "MEMBER",
      "member_position": member_position
    }
  );

  return response.data.result;
}

export const deleteTeamMember = async (teamId: string | undefined, team_member_id: number) => {
  const response = await axiosInstance.delete<baseResponse>(
    `/team/team_member?team_id=${teamId}&member_id=${team_member_id}`
  );

  return response.data;
}