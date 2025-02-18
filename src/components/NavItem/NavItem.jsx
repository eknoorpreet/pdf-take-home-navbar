import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './NavItem.module.css';

const NavItem = ({ name, path, Icon, theme, handleClick }) => {
  return (
    <li className={styles.navItem} role='menuitem'>
      <NavLink
        className={({ isActive }) =>
          cn(styles.navLink, styles[theme], { [styles.active]: isActive })
        }
        onClick={handleClick}
        to={path}
        tabIndex='0'
        aria-label={name}
      >
        <span className={styles.content}>
          {Icon && <Icon className={styles.icon} aria-hidden='true' />}
          {name && <span>{name}</span>}
        </span>
      </NavLink>
    </li>
  );
};

export default NavItem;
