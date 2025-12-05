import useAppStore from '@/stores/useAppStore'

type Props = {
  className?: string
}

function ThemeModeButton({ className = '' }: Props) {
  const { themeMode, setThemeMode } = useAppStore();

  return (
    <button className={`${className} text-xl`} onClick={() => setThemeMode()}>
      {themeMode === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeModeButton;