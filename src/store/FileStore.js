import { create } from "zustand";

export const useFileStore = create((set) => ({
    file: null,
    setFile: (input) => set({ file: input }),
}));

  