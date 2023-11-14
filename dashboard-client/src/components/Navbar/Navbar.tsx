import { FC } from 'react';

import { NAVBAR, ROUTES } from 'common';

import styles from './styles';

const Navbar: FC = () => (
  <nav className={styles['navbar']}>
    <div className={styles['navbar-logo']}>
      <a className={styles['navbar-logo__item']} href={ROUTES.MAIN}>
        <i className='bi bi-radar' />
        <span>{NAVBAR.LOGO}</span>
      </a>
    </div>
    <div className={styles['links-wrapper']}>
      <div className={styles['links-container']}>
        <a className={styles['links-container__item']} href={ROUTES.MAIN}>
          {NAVBAR.DASHBOARD}
        </a>
        <a
          className={styles['links-container__item']}
          href={ROUTES.DEPARTMENTS}
        >
          {NAVBAR.DEPARTMENTS}
        </a>
        <a className={styles['links-container__item']} href={ROUTES.STAFF}>
          {NAVBAR.STAFF}
        </a>
        <a className={styles['links-container__item']} href={ROUTES.SIGN_IN}>
          {NAVBAR.SIGN_IN}
        </a>
      </div>
      <div
        className={`${styles['links-container']} ${styles['container-small']} ${styles['layout']}`}
      >
        <a
          className={styles['links-container__item']}
          href={ROUTES.CREATE_STAFF}
        >
          Create Staff
        </a>
        <a
          className={styles['links-container__item']}
          href={ROUTES.CREATE_DEPARTMENT}
        >
          Create Department
        </a>
      </div>
    </div>
  </nav>
);
export default Navbar;
