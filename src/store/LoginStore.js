import { create } from 'zustand'

export const useLoginStore = create((set) => ({
    isLogin: false,
    setLogin: () => set({ isLogin: true }),
    setLogout: () => set({ isLogin: false })
}));