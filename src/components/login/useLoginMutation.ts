import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postSignIn } from "@/shared/api/signin";
import { axiosInstance } from "@/shared/api/instance";
import { ACCESS_TOKEN_KEY, HTTP_STATUS_CODE } from "@/shared/constant/api";
import { PostLoginErrorResponse } from "@/shared/api/signin/type";
import { useLoginStore } from "@/store/LoginStore";

export const useLoginMutation = (callbacks?: { onSuccess?: () => void }) => {
  const { setLogin } = useLoginStore();
  return useMutation({
    mutationFn: postSignIn,

    onSuccess: (data) => {
      const accessToken = data.token_info.access_token;
      const grantType = data.token_info.grant_type;

      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      axiosInstance.defaults.headers.Authorization = `${grantType} ${accessToken}`;
      setLogin(data.member_id, data.email, data.nickname);

      callbacks?.onSuccess?.();
    },

    onError: (error: AxiosError<PostLoginErrorResponse>) => {
      if (!error.response) {
        alert("서버와 연결할 수 없습니다. 네트워크를 확인해주세요.");
        return;
      }

      const { status, data } = error.response;

      if (status === HTTP_STATUS_CODE.BAD_REQUEST) {
        switch (data.code) {
          case "MEMBER_1006":
            alert(`${data.message}`);
            break;
          default:
            alert(`잘못된 요청입니다: ${data.message}`);
        }
        return;
      }

      if (status === HTTP_STATUS_CODE.FORBIDDEN) {
        alert("권한이 없습니다.");
        return;
      }
      alert(`에러가 발생했습니다. 상태 코드: ${status}`);
    },
  });
};
