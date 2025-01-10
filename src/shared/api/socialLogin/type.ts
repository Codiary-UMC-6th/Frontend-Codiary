import { GeneralResponse } from "@/shared/api/generalResponse";

export interface RedirectionResult {
  redirect_url: string;
}

export interface AuthResult {
  token_info: {
    grant_type: string;
    access_token: string;
    refresh_token: string;
    refresh_token_expiration_time: string;
  };
  email: string;
  nickname: string;
  memberId: number;
}

export type GetRedirectionURLResponse = GeneralResponse<RedirectionResult>;
export type PostKakaoAuthResponse = GeneralResponse<AuthResult>;

export interface PostKakaoAuthRequest {
  code: string;
}
