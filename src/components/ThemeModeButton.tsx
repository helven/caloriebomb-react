import useTheme from '@/hooks/useTheme';

function ThemeModeButton() {
  const { themeMode, updateThemeMode } = useTheme();

  return (
    <button className="text-xl" onClick={() => updateThemeMode()}>
      {themeMode === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeModeButton;