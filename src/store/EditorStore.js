import { create } from "zustand";

export const useEditorStore = create((set) => ({
    register: false,
    setRegister: (value) => set({ register: value}),
}));
