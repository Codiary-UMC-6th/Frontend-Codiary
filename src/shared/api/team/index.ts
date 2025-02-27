import { baseResponse } from "../common/type";
import { axiosInstance, axiosPublicInstance } from "../instance";
import { AddTeamData, TeamInfoResponse, getTeamProfileResponse, getTeamListResponse, getTeamDiaryResponse, getTeamProjectResponse, getTeamFollowedResponse, ToggleFollowResponse } from "./type";

export const postTeamMember = async (team_id: number) => {};

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