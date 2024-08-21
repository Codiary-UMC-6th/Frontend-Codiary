import { create } from "zustand";

export const useFileStore = create((set) => ({
    files: [],
    appendFile: (input) => set((state) => ({
        files: [...state.files, input]
    })),
    clearFiles: () => set({ files: [] }),
}));

  