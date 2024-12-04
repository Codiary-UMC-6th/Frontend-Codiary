export interface PostLoginRequestBody {
  email: string;
  password: string;
}

export interface PostLoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Result;
}

export interface Result {
  token_info: TokenInfo;
  email: string;
  nickname: string;
  member_id: number;
}

export interface TokenInfo {
  grant_type: string;
  access_token: string;
  refresh_token: string;
  refresh_token_expiration_time: Date;
}
