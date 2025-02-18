import { useRef } from 'react';
import cn from 'classnames';

import useClickOutside from '../../hooks/useClickOutside';
import useKeyPress from '../../hooks/useKeyPress';
import NavItem from '../NavItem/NavItem';

import styles from './NavList.module.css';

const NavList = ({
  list = [],
  isMenuOpen,
  setIsMenuOpen,
  isMobile,
  theme,
  handleClick,
}) => {
  const menuRef = useRef(null);

  // Close the mobile menu when the user clicks outside it
  useClickOutside(menuRef, () => setIsMenuOpen(false));

  // Close the mobile menu when the user presses 'Escape'
  useKeyPress('Escape', () => setIsMenuOpen(false));

  return (
    <ul
      ref={menuRef}
      className={cn(styles.navList, styles[theme], {
        [styles.mobileMenu]: isMobile,
        [styles.hidden]: !isMenuOpen,
        [styles.open]: isMenuOpen,
      })}
      role='menu'
      aria-expanded={isMenuOpen}
      aria-label='Main menu'
    >
      {list.map(({ name, path, icon: Icon }) => (
        <NavItem
          name={name}
          path={path}
          key={name}
          Icon={Icon}
          theme={theme}
          handleClick={handleClick}
        />
      ))}
    </ul>
  );
};

export default NavList;
