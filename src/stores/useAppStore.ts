// Typescript file
// Zustand store for managing application state
// 1. React and React ecosystem imports

// 2. Asset imports

// 3. Component imports
import { create } from 'zustand'

interface AppState {
  initApp: () => Promise<void>;
  themeMode: 'light' | 'dark';
  setThemeMode: () => void;
  fontSize: string;
  setFontSize: (fontSize: string) => void;
  searchQuery: string;
  setSearchQuery: (siteSearch: string) => void;
}

const useAppStore = create<AppState>((set) => {
  const initialTheme = 'light';

  return {
    themeMode: initialTheme, // Set default initial value
    initApp: async () => {
      let storedTheme;
      // Get the theme from an API
      //const response = await fetch('your-api-endpoint/theme');
      //const data = await response.json();
      //storedTheme = (data.theme as 'light' | 'dark') || initialTheme

      // Get the theme from an local storage
      storedTheme = (localStorage.getItem('themeMode') as 'light' | 'dark') || initialTheme; // if not set, use initialTheme
      set((state) => ({
        ...state,
        themeMode: storedTheme === 'dark' ? 'dark' : 'light',
      }));
    },
    setThemeMode: () => set((state: AppState) => {
      const newTheme = state.themeMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newTheme);
      return {
        ...state,
        themeMode: newTheme
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

export default useAppStore