import { useCallback, useEffect, useState } from 'react';
import { useViewportSize } from '@mantine/hooks';

import { Brand } from '../Brand/Brand';
import NavList from '../NavList/NavList';
import { MenuToggle } from '../MenuToggle/MenuToggle';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

import styles from './Navbar.module.css';

export default function Navbar({
  brandName = 'PBS',
  navLinks = [],
  theme,
  setTheme,
  mobileBreakpoint = 768,
  themeConfig = {
    light: {
      text: '#000',
      background: '#fff',
    },
    dark: {
      text: '#fff',
      background: '#000',
    },
    active: '#38bdf8',
    focus: '#4d90fe',
  },
  logo = null,
  onNavItemClick,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { width } = useViewportSize();
  const isMobile = isHydrated && width < mobileBreakpoint; // Only determine mobile state after hydration

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Set custom colors here dynamically instead of hard-coding in the CSS
  const setCustomColors = useCallback(() => {
    const { light, dark, active, focus } = themeConfig;

    // Light theme colors
    document.documentElement.style.setProperty(
      '--active-link-color-light',
      active
    );
    document.documentElement.style.setProperty(
      '--text-color-light',
      light.text
    );
    document.documentElement.style.setProperty(
      '--bg-color-light',
      light.background
    );

    // Dark theme colors
    document.documentElement.style.setProperty(
      '--active-link-color-dark',
      active
    );
    document.documentElement.style.setProperty('--text-color-dark', dark.text);
    document.documentElement.style.setProperty(
      '--bg-color-dark',
      dark.background
    );

    // Common color
    document.documentElement.style.setProperty('--focus-color', focus);
  }, [themeConfig]);

  useEffect(() => {
    setCustomColors();
  }, [setCustomColors]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
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
            <MenuToggle isOpen={isMenuOpen} onClick={toggleMenu} />
          )}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </nav>
    </header>
  );
}
