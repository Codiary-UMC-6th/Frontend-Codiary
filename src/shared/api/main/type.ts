export interface GetPostsResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: Result;
}

export interface Result {
    content: Post[];
}

export interface Post {
    author: string;
    author_image_url: string;
    body: string;
    created_at: string;
    id: number;
    team_banner_image_url?: string;
    team_profile_image_url?: string;
    thumbnail_image_url?: string;
    title: string;
    updated_at: string;
}