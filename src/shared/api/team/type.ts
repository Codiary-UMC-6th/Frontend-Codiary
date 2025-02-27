import { StringLiteral } from "typescript";

//add team
export interface AddTeamData {
  name: string;
  admin_email: string;
  intro: string;
  github: string;
  linked_in: string;
  discord: string;
  instagram: string;
}

export interface postTeamResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: teamInfo;
}

// 팀 정보 조회
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

export interface getTeamInfoResponse {
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
  team_member_id: Number;
  team_member_role: string;
  team_member_position: string;
  member: MemberInfo;
}

export interface MemberInfo {
  user_id: Number;
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
