export interface GeneralResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export interface EmptyResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}
