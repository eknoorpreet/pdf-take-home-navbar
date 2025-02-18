import { Sun, Moon } from 'lucide-react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className={styles.themeButton}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon
          className={`${styles.icon} ${styles[theme]}`}
          aria-hidden='true'
        />
      ) : (
        <Sun className={`${styles.icon} ${styles[theme]}`} aria-hidden='true' />
      )}
    </button>
  );
}
