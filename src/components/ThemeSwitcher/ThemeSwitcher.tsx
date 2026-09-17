import { useTheme } from '../../shared/context/ThemeContext';
import styles from './ThemeSwitcher.module.css';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.button}
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
