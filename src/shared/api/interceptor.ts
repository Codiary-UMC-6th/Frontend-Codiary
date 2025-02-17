import * as Sentry from "@sentry/react";

import axios from "axios";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

import { HTTPError } from "./HTTPError";
import { getReissuedToken } from "./auth/index";
import { axiosInstance } from "./instance";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  HTTP_STATUS_CODE,
  GRANT_TYPE,
} from "../constant/api";
import { PATH } from "../constant/path";
import { useLoginStore } from "@/store/LoginStore";

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
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
        try {
          console.log("🔄 토큰 갱신 시도 중...");
          const newAccessToken = await refreshAccessToken();
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(error.config);
        } catch (err) {
          console.log("❌ 토큰 갱신 실패, 로그아웃 처리");
          if (useLoginStore.getState().isLogin) {
            useLoginStore.getState().setLogout();
          }
        }
      }
      return Promise.reject(error);
    }
  );

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

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    throw new Error("Refresh Token이 없습니다.");
  }

  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/v2/auth/refresh`,
    {
      refresh_token: refreshToken,
    }
  );

  const newAccessToken = response.data.token_info.access_token;
  const newGrantType = response.data.token_info.grant_type;

  // ✅ 새로운 토큰 저장
  localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
  localStorage.setItem(GRANT_TYPE, newGrantType);

  return newAccessToken;
};
