import create from 'zustand';

interface FileStore {
  files: File[];
  addFiles: (newFiles: File[]) => void;
}

export const useFileStore = create<FileStore>((set) => ({
  files: [],
  addFiles: (newFiles) => set((state) => ({ files: [...state.files, ...newFiles] })),
}));
