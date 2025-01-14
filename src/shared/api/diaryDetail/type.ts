import { GeneralResponse } from "@/shared/api/generalResponse";

export interface PostResult {
    author_nickname: string;
    author_profile_image_url: string;
    coauthor_ids: number[];
    created_at: string;
    member_id: number;
    post_access: string;
    post_body: string;
    post_category: string;
    post_file_list: any[];
    post_id: number;
    post_status: boolean;
    post_title: string;
    team_banner_image_url: string;
    team_profile_image_url: string;
    thumbnail_image_url: string;
    updated_at: string;
}

export type GetPostResponse = GeneralResponse<PostResult>;

export interface AuthorResult {
    introduction: string;
    user_name: string;
}

export type GetAuthorResponse = GeneralResponse<AuthorResult>;