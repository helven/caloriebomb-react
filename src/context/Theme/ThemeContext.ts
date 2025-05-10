import { createContext } from "react";

interface ThemeContextType {
  themeMode: 'light' | 'dark';
  fontSize: string;
  updateThemeMode: () => void;
  updateFontSize: (size: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'light',
  fontSize: 'medium',
  updateThemeMode: () => {},
  updateFontSize: () => {},
});

export default ThemeContext;