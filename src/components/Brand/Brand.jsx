import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Brand.module.css';

export function Brand({ brandName, logo = null, theme, className }) {
  const defaultLogoConfig = {
    src: null,
    alt: '',
    className: '',
    placement: 'left',
    height: 32,
  };

  const logoConfig = logo ? { ...defaultLogoConfig, ...logo } : null;
  const logoElement = logoConfig?.src && (
    <img
      src={logoConfig.src}
      alt={logoConfig.alt || `${brandName} logo`}
      className={cn(styles.brandImage, logoConfig.className)}
      style={{ height: logoConfig.height, width: 'auto' }}
    />
  );

  return (
    <NavLink
      to='/'
      className={cn(
        styles.brand,
        styles[theme],
        {
          [styles.brandWithImage]: logoConfig?.src,
          [styles.imageOnly]: logoConfig?.placement === 'only',
        },
        className
      )}
    >
      {!brandName ? (
        logoElement
      ) : logoConfig?.placement === 'right' ? (
        <>
          <span className={styles.brandText}>{brandName}</span>
          {logoElement}
        </>
      ) : (
        <>
          {logoElement}
          <span className={styles.brandText}>{brandName}</span>
        </>
      )}
    </NavLink>
  );
}
