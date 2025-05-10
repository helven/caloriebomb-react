import { useContext } from 'react';
import ThemeContext from '@/context/Theme/ThemeContext';

const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  // Adding more stuffs into context to show benefits of using custom hooks
  const enhancedThemeContext = {
    ...themeContext,

    // Basic theme state
    isDark: themeContext.themeMode === 'dark',
    isLight: themeContext.themeMode === 'light',
    
    // Comprehensive color palette
    colors: {
      backgroundClass: themeContext.themeMode === 'dark' ? 'bg-gray-800' : 'bg-white',
      error: '#f44336',
      warning: '#ff9800',
      success: '#4caf50',
    },
  }

  return enhancedThemeContext;
};

export default useTheme;
