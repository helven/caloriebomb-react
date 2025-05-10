// @ts-nocheck : JS compatible
import { create } from 'zustand'

const useAppStore = create((set) => ({
  themeMode: 'light',
  fontSize: 'medium',
  setThemeMode: () => set((state) => ({
    themeMode: state.themeMode === 'light' ? 'dark' : 'light' 
  })),
  setFontSize: (fontSize) => set({fontSize})
}))

export default useAppStore

