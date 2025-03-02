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
    post_file_list: any;
    post_id: number;
    post_status: boolean;
    post_title: string;
    team_banner_image_url: string;
    team_profile_image_url: string;
    thumbnail_image_url: string;
    updated_at: string;
    is_bookmarked: boolean;
    bookmark_count: number;
}

export interface AuthorResult {
    introduction: string;
    user_name: string;
    current_member_id: number;
    user_id: number;
}

export interface IsFollowedResult {

}

export interface ToggleFollowResult {
    follow_status: boolean;
}

export interface ToggleBookmarkResult {

}

export interface GetCommentsResult {
    content: any[];
}

export interface PostCommentResult {
    comment_body: string;
}

export interface PostCommentRequest {
    comment_body: string;
}  

export type GetPostResponse = GeneralResponse<PostResult>;
export type GetAuthorResponse = GeneralResponse<AuthorResult>;
export type GetIsFollowedResponse = GeneralResponse<boolean>;
export type ToggleFollowResponse = GeneralResponse<ToggleFollowResult>;
export type ToggleBookmarkResponse = GeneralResponse<ToggleBookmarkResult>;
export type GetCommentsResponse = GeneralResponse<GetCommentsResult>;
export type PostCommentResponse = GeneralResponse<PostCommentResponse>;