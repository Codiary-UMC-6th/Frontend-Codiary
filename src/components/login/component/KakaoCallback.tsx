import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postKakaoLogin } from "@/shared/api/socialLogin";
import axios from "axios";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
          alert("인증 코드가 없습니다. 다시 시도해주세요.");
          return;
        }

        const response = await postKakaoLogin(code);

        if (response.isSuccess) {
          alert("로그인 성공!");
          // URL에서 'code' 제거
          navigate("/", { replace: true });
          navigate("/");
        } else {
          alert(`로그인 실패: ${response.message}`);
        }
      } catch (error) {
        console.error("로그인 처리 중 오류:", error);
      }
    };

    handleCallback();
  }, [navigate]);

  return <div>카카오 로그인 처리 중입니다...</div>;
};

export default KakaoCallback;
