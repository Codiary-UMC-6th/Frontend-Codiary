// get member profile
export interface GetMemberProfileResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: memberProfile;
}

export interface memberProfile {
  current_memberId: number;
  user_id: number;
  user_name: string;
  photo_url: string;
  github_url: string;
  linkedin_url: string;
  discord_url: string;
  introduction: string;
  tech_stacks_list: string[];
  team_list: teamInfo[];
  my_page: boolean;
}

export interface teamInfo {
  team_id: number;
  team_name: string;
}

// get&post user information
export interface userInfoResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: userInfo;
}

export interface userInfo {
  birth: string;
  introduction: string;
  github: string;
  linkedin: string;
  discord: string;
}

// patch teckstack
export interface patchTeckstackResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    member_id: number;
    tech_stacks: string[];
  };
}

// post personal project
export interface postPersonalProjectResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    project_id: number;
    name: string;
  };
}

// get personal Diary
export interface getPersonalDiaryResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    posts: diary[];
    list_size: number;
    total_page: number;
    total_elements: number;
    is_first: boolean;
    is_last: boolean;
  }
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