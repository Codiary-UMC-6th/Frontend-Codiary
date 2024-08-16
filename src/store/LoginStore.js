import { create } from 'zustand'

export const useLoginStore = create((set) => ({
    isLogin: false,
    setLogin: () => set({ isLogin: true }),
    setLogout: () => set({ isLogin: false }),

    email: null,
    setEmail: (email) => set({ email: email }),
    nickname: null,
    setNickname: (nickname) => set({ nickname: nickname }),
    memberId: null,
    setMemberId: (id) => ({ memberId: id }),
}));