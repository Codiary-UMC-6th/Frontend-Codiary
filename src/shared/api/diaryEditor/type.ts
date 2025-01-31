import { GeneralResponse } from "@/shared/api/generalResponse";

export interface postSignUpUserInfoRequest {
    postTitle: string;
    postBody: string;
    postStatus: boolean;
    postAccess: string;
    postFilse: any[];
}  

export interface PostDiaryResult {

}

export type postDiaryResponse = GeneralResponse<PostDiaryResult>;