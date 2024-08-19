// store.js
import create from "zustand";

const useSearchStore = create((set) => ({
  keyword: "",
  searchResults: [],
  setKeyword: (keyword) => set({ keyword }),
  setSearchResults: (results) => set({ searchResults: results }),
}));

export default useSearchStore;
