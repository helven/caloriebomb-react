// @ts-nocheck : JS compatible
import { useState, useEffect } from 'react';
import ThemeContext from '@/context/Theme/ThemeContext';

function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'light'; // get mode from localStorage or set default to light
  });
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fontSize') || 'medium'; // get fontSize from localStorage or set default to medium
  });
  const updateThemeMode = () => {
    setThemeMode(prevThemeMode => (prevThemeMode === 'light' ? 'dark' : 'light'));
    
  };
  const updateFontSize = (size) => {
    if (size !== '') {
      setFontSize(size);
    }
  };

  useEffect(() => {
    // Save to localStorage whenever the theme changes
    localStorage.setItem('themeMode', themeMode);
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
  }, [themeMode]);

  useEffect(() => {
    // Save to localStorage whenever the fontSize changes
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  
  return (
    <ThemeContext.Provider value={{ themeMode: themeMode as 'light' | 'dark', updateThemeMode, fontSize, updateFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;