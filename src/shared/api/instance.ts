import axios from "axios";
import {
  handleAPIError,
  handleCheckAndSetToken,
  handleTokenError,
  refreshAccessToken,
} from "./interceptor";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  GRANT_TYPE,
} from "@/shared/constant/api";

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/v2`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPublicInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/v2`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(handleCheckAndSetToken);
axiosInstance.interceptors.request.use((res) => res, handleAPIError);
axiosInstance.interceptors.request.use((res) => res, handleTokenError);

// ✅ 응답 인터셉터: Access Token 만료 시 자동 갱신

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (response?.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken(); // 🔄 새로운 Access Token 요청
        config.headers.Authorization = `${localStorage.getItem(
          GRANT_TYPE
        )} ${newAccessToken}`;
        return axiosInstance(config); // 🔄 실패한 요청 재시도
      } catch (refreshError) {
        console.error("Refresh Token 만료, 재로그인이 필요합니다.");
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(GRANT_TYPE);
        window.location.href = "/login"; // 🚀 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ✅ 일반적인 API 에러 핸들링
axiosInstance.interceptors.response.use((response) => response, handleAPIError);
