import { useEffect, useState } from 'react';
import { useViewportSize } from '@mantine/hooks';

import { Brand } from '../Brand/Brand';
import NavList from '../NavList/NavList';
import { MenuToggle } from '../MenuToggle/MenuToggle';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.css';

export default function Navbar({
  brandName = 'PBS',
  navLinks = [],
  mobileBreakpoint = 768,
  logo = null,
  onNavItemClick,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { width } = useViewportSize();
  const isMobile = isHydrated && width < mobileBreakpoint; // Only determine mobile state after hydration

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenuOnMobile = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const handleClick = (e) => {
    closeMenuOnMobile();
    if (onNavItemClick) {
      e.preventDefault();
      onNavItemClick(e);
    }
  };

  return (
    <header className={`${styles.header} ${styles[theme]}`} role='banner'>
      <nav
        className={styles.nav}
        role='navigation'
        aria-label='Main navigation'
      >
        <Brand brandName={brandName} theme={theme} logo={logo} />
        <NavList
          list={navLinks}
          theme={theme}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          handleClick={handleClick}
          onNavItemClick={onNavItemClick}
          isMobile={isMobile}
        />
        <div className={styles.menuAndThemeToggle}>
          {navLinks.length !== 0 && (
            <MenuToggle
              isOpen={isMenuOpen}
              onClick={toggleMenu}
              theme={theme}
            />
          )}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </nav>
    </header>
  );
}
