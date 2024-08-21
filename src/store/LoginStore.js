import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useLoginStore = create(
    persist(
        (set) => ({
            isLogin: false,
            setLogin: () => set({ isLogin: true }),
            setLogout: () => set({ 
                isLogin: false ,
                email: null,
                nickname: null,
                memberId: null,
            }),
        
            email: null,
            setEmail: (email) => set({ email: email }),
            nickname: null,
            setNickname: (nickname) => set({ nickname: nickname }),
            memberId: null,
            setMemberId: (id) => {
                const memberId = String(id);
                set({ memberId });
                console.log(memberId); },

            teamList: [],
            setTeamList: (list) => set({ teamList: list }),
            }),
            {
                name: "userInfoStorage",
            }
    )
);

