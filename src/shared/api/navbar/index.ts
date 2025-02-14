import { GetTeamListResponse } from "./type";
import { axiosInstance } from "../instance";

export const getTeamList = async () => {
  const response = await axiosInstance.get<
  GetTeamListResponse
  >(`/team/list`);
  console.log(response);
  return response.data.result;
}
