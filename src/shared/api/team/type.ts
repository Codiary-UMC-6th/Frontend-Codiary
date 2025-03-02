import { StringLiteral } from "typescript";
import { memberProfile } from "../profile/type";

//add team
export interface AddTeamData {
  name: string;
  email: string;
  intro: string;
  github: string;
  linked_in: string;
  discord: string;
  instagram: string;
}

// 팀 정보 추가 & 조회 & 수정
export interface teamInfo {
  team_id: number;
  name: string;
  intro: string;
  admin_mail: string;
  profile_image_url: string;
  banner_image_url: string;
  github: string;
  email: string;
  linked_in: string;
  discord: string;
  instagram: string;
}

export interface TeamInfoResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: teamInfo;
}

// 팀 프로필 조회
export interface teamProfile {
  team_id: number;
  name: string;
  intro: string;
  profile_image_url: string;
  banner_image_url: string;
  github: string;
  email: string;
  linked_in: string;
  discord: string;
  instagram: string;
  is_followed: boolean;
  current_member_id: number;
  is_admin: boolean;
  team_member_list: teamMember[];
}

export interface teamMember {
  member: MemberInfo;
  team_member_id: number;
  team_member_role: "MEMBER" | "ADMIN";
  team_member_position: "BACKEND" | "FRONTEND" | "DESIGNER" | "PLANNER";
}

export interface MemberInfo {
  user_id: number;
  user_name: string;
  photo_url: string;
}

export interface getTeamProfileResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: teamProfile;
}

// 팀 리스트 조회 -> 전체 팀
export interface teams {
  team_id: number;
  team_name: string;
}

export interface getTeamListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: teams[];
}

// 팀 게시글 페이징 조회
export interface getTeamDiaryResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: getTeamDiaryResult;
}

export interface getTeamDiaryResult {
  posts: diary[];
  list_size: number;
  total_page: number;
  total_elements: number;
  is_first: boolean;
  is_last: boolean;
}

export interface diary {
  post_id: number;
  member_id: number;
  author_nickname: string;
  team_id: number;
  team_profile_image_url: string;
  team_banner_image_url: string;
  project_id: number;
  post_title: string;
  post_body: string;
  thumbnail_image_url: string;
  post_status: string;
  post_category: string;
  coauthor_ids: number[];
  post_access: string;
  post_file_list: {
    postFileList: file[];
  }
  created_at: string;
  updated_at: string;
}

export interface file {
  name: string;
  url: string;
}

// 팀의 프로젝트 조회
export interface getTeamProjectResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: teamProject[];
}

export interface teamProject {
  project_id: number;
  name: string;
}

// 팀 팔로우
export interface getTeamFollowedResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: boolean;
}

export interface ToggleFollowResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    follow_status: boolean;
  }
}

// 팀원 추가
export interface getUserInfoByNicknameResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: memberProfile[];
}

export interface postTeamMemberResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: teamMember;
}

export interface teamMemberData {
  member_nick_name: string;
  member_role: "MEMBER" | "ADMIN";
  member_position: "BACKEND" | "FRONTEND" | "DESIGNER" | "PLANNER";
}