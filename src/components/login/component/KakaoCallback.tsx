import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postKakaoLogin } from "@/shared/api/socialLogin";

import { axiosInstance } from "@/shared/api/instance";
import { ACCESS_TOKEN_KEY } from "@/shared/constant/api";
import { useLoginStore } from "@/store/LoginStore";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const { setLogin } = useLoginStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
          alert("인증 코드가 없습니다. 다시 시도해주세요.");
          setIsProcessing(false);
          return;
        }

        const response = await postKakaoLogin(code);

        if (response.isSuccess) {
          alert("로그인 성공!");
          window.history.replaceState({}, document.title, "/");

          const accessToken = response.token_info.access_token;
          const grantType = response.token_info.grant_type;

          localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
          axiosInstance.defaults.headers.Authorization = `${grantType} ${accessToken}`;
          setLogin(response.member_id, response.email, response.nickname);

          navigate("/", { replace: true });
        } else {
          alert(`로그인 실패: ${response.message}`);
          setIsProcessing(false);
        }
      } catch (error) {
        console.error("로그인 처리 중 오류:", error);
        setIsProcessing(false);
      }
    };

    handleCallback();
  }, [navigate]);

  /**
   * 현재 카카오 로그인 자체는 성공했으나 Redirect URI를 변경하지 못해
   * 메인 페이지로 가게 되면서 로그인 처리 중... 분기 처리 실패!
   * Redirect URI를 변경해야 할 듯합니다! => 회의때~
   **/
  return (
    <div>
      {isProcessing
        ? "카카오 로그인 처리 중입니다..."
        : "로그인 실패, 다시 시도해주세요."}
    </div>
  );
};

export default KakaoCallback;
