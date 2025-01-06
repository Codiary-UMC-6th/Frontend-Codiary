export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export interface RedirectionResult {
  redirect_url: string;
}

export interface AuthResult {
  tokenInfo: {
    grantType: string;
    accessToken: string;
    refreshToken: string;
    refreshTokenExpirationTime: string;
  };
  email: string;
  nickname: string;
  memberId: number;
}

export type GetRedirectionURLResponse = ApiResponse<RedirectionResult>;
export type PostKakaoAuthResponse = ApiResponse<AuthResult>;

export interface PostKakaoAuthRequest {
  code: string;
}
