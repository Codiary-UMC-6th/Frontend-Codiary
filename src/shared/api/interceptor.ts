import * as Sentry from "@sentry/react";

import { AxiosError, InternalAxiosRequestConfig } from "axios";

import { HTTPError } from "./HTTPError";
import { getReissuedToken } from "./auth/index";
import { axiosInstance } from "./instance";
import { ACCESS_TOKEN_KEY, HTTP_STATUS_CODE } from "../constant/api";
import { PATH } from "../constant/path";

interface ErrorResponse {
  success?: boolean;
  message?: string;
  code?: number;
}

export const handleCheckAndSetToken = (config: InternalAxiosRequestConfig) => {
  if (!config || !config.headers || config.headers.Authorization) return config;

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!accessToken) {
    window.location.replace(PATH.LANDING); // 나중에 로그인 분리하고 변경
    throw new Error("토큰이 존재하지 않습니다.");
  }

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

export const handleTokenError = async (error: AxiosError<ErrorResponse>) => {
  const originRequest = error.config;

  if (!error.response || !originRequest)
    throw new Error("에러가 발생했습니다.");

  const { status } = error.response;

  if (status === HTTP_STATUS_CODE.UNAUTHORIZED) {
    try {
      const { data } = await getReissuedToken();

      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      originRequest.data.headers.Authorization = `Bearer ${data.accessToken}`;

      return axiosInstance(originRequest);
    } catch (error) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      window.location.replace(PATH.LANDING); // 나중에 로그인 분리하고 변경

      throw new Error("토큰 갱신에 실패하였습니다.");
    }
  }

  return Promise.reject(error);
};

export const handleAPIError = (error: AxiosError<ErrorResponse>) => {
  if (!error.response) throw error;

  Sentry.withScope((scope) => {
    scope.setLevel("error");
    scope.captureMessage(`[API Error] ${window.location.href}`);
  });

  const { data, status } = error.response;

  if (status >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, data.message);
  }

  throw new HTTPError(status, data.message);
};
