// Typescript file
// Zustand store for managing application state
import { create } from 'zustand'

interface AppState {
  themeMode: 'light' | 'dark';
  setThemeMode: () => void;
  fontSize: string;
  setFontSize: (fontSize: string) => void;
  searchQuery: string;
  setSearchQuery: (siteSearch: string) => void;
}

const useAppStore = create<AppState>((set) => {
  return {
    themeMode: 'light',
    setThemeMode: () => set((state: AppState) => {
      return {
        ...state,
        themeMode: state.themeMode === 'light' ? 'dark' : 'light'
      }
    }),
    fontSize: 'medium',
    setFontSize: (fontSize: string) => set((state: AppState) => {
      return {
        ...state,
        fontSize: fontSize
      }
    }),
    searchQuery: '',
    setSearchQuery: (searchQuery: string) => set((state: AppState) => {
      return {
        ...state,
        searchQuery: searchQuery
      }
    })
  }
});

//useAppStore.subscribe((state) => {
//  console.log(state.themeMode);
//});

export default useAppStore