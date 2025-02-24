import { MenuIcon, XIcon } from 'lucide-react';
import styles from './MenuToggle.module.css';

export function MenuToggle({ isOpen, onClick, theme }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.menuButton} ${styles[theme]}`}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls='nav-menu'
    >
      {isOpen ? (
        <XIcon className={styles.icon} aria-hidden='true' />
      ) : (
        <MenuIcon className={styles.icon} aria-hidden='true' />
      )}
    </button>
  );
}
