import { GeneralResponse } from "@/shared/api/generalResponse";

export interface PostDiaryResult {
    postId: number;
}

export type postDiaryResponse = GeneralResponse<PostDiaryResult>;