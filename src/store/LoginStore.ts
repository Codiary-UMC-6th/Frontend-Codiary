import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ACCESS_TOKEN_KEY, GRANT_TYPE, MEMBER_ID } from "@/shared/constant/api";
import { axiosInstance } from "@/shared/api/instance";

// 상태 타입 정의
interface LoginState {
  isLogin: boolean;
  email: string | null;
  nickname: string | null;
  memberId: number | null;
  isLoading: boolean;
  setLogin: (memberId: number, email: string, nickname: string) => void;
  setLogout: () => void;
  initializeLoginState: () => Promise<void>;
}

export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      isLogin: false,
      email: null,
      nickname: null,
      memberId: null,
      isLoading: true,

      // 로그인 설정
      setLogin: (memberId, email, nickname) => {
        console.log("🔵 setLogin 호출됨", { memberId, email, nickname });
        set({ isLogin: true, memberId, email, nickname });
      },

      // 로그아웃 설정
      setLogout: () => {
        console.log("🔴 setLogout 호출됨");
        set({ isLogin: false, email: null, nickname: null, memberId: null });

        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(GRANT_TYPE);
        localStorage.removeItem(MEMBER_ID);
      },

      // 로그인 상태 초기화
      initializeLoginState: async () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        const memberId = localStorage.getItem(MEMBER_ID);
        const isLoggedIn = !!accessToken; // 토큰이 존재하면 로그인 상태로 설정

        if (isLoggedIn) {
          const grantType = localStorage.getItem(GRANT_TYPE);
          axiosInstance.defaults.headers.Authorization = `${grantType} ${accessToken}`;
        }

        set({
          isLoading: false,
          isLogin: isLoggedIn,
          memberId: memberId ? Number(memberId) : null, // String → Number 변환 추가
        });

        console.log(
          `로그인 상태 복구: ${
            isLoggedIn ? `로그인됨 (memberId: ${memberId})` : "로그아웃됨"
          }`
        );
      },
    }),
    {
      name: "userInfoStorage",
    }
  )
);
