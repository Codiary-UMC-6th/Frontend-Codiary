import axios from "axios";

import {
  handleAPIError,
  handleCheckAndSetToken,
  handleTokenError,
} from "./interceptor";

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

axiosInstance.interceptors.response.use((res) => res, handleTokenError);

axiosInstance.interceptors.response.use((res) => res, handleAPIError);
