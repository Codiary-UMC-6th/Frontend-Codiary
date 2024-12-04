import { useMutation } from "@tanstack/react-query";

import { AxiosError } from "axios";

import { postSignIn } from "@/shared/api/signin";
import { axiosInstance } from "@/shared/api/instance";
import { ACCESS_TOKEN_KEY, HTTP_STATUS_CODE } from "@/shared/constant/api";
import { PATH } from "@/shared/constant/path";
import { access } from "fs";

export const useLoginMutation = (callbacks?: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: postSignIn,

    onSuccess: (data) => {
      let accessToken = data.token_info.access_token;
      let grantType = data.token_info.grant_type;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

      axiosInstance.defaults.headers.Authorization = `${grantType} ${accessToken}`;
      callbacks?.onSuccess?.();
    },

    // 이 부분 에러처리 확실하게 추가
    onError: (error: AxiosError) => {
      if (!error.response) return;

      const { status } = error.response;

      if (status === HTTP_STATUS_CODE.BAD_REQUEST) {
        alert("잘못된 요청입니다.");
        return;
      }
      if (status === HTTP_STATUS_CODE.FORBIDDEN) {
        alert("존재하지 않는 이메일입니다.");
        return;
      }
    },
  });
};
