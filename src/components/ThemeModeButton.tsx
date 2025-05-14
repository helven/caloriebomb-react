// @ts-nocheck : JS compatible
import React, { useEffect } from "react";
import useAppStore from '@/stores/useAppStore'

function ThemeModeButton() {
  const { themeMode, setThemeMode } = useAppStore();

  return (
    <button className="text-xl" onClick={() => setThemeMode()}>
      {themeMode === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeModeButton;