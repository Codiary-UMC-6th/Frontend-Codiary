import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ACCESS_TOKEN_KEY } from "@/shared/constant/api";

export const useLoginStore = create(
  persist(
    (set, get) => ({
      isLogin: false,
      email: null,
      nickname: null,
      memberId: null,
      isLoading: true,

      // 로그인 설정
      setLogin: (memberId, email, nickname) => {
        set({ isLogin: true, memberId, email, nickname });
        console.log("로그인 성공:", { memberId, email, nickname });
      },

      // 로그아웃 처리
      setLogout: () => {
        set({
          isLogin: false,
          email: null,
          nickname: null,
          memberId: null,
        });
        console.log("로그아웃됨");
      },

      // 로그인 상태 초기화
      initializeLoginState: async () => {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        const isLoggedIn = !!token; // 토큰이 존재하면 로그인 상태로 설정
        set({ isLoading: false, isLogin: isLoggedIn });
        console.log(
          `로그인 상태 복구: ${isLoggedIn ? "로그인됨" : "로그아웃됨"}`
        );
      },
    }),
    {
      name: "userInfoStorage",
    }
  )
);
