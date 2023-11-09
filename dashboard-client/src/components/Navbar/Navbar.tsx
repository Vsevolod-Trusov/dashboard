import { FC } from 'react';

import { NAVBAR } from 'common';

import styles from './styles';

const Navbar: FC = () => (
  <nav className={styles['navbar']}>
    <div className={styles['navbar-logo']}>
      <a className={styles['navbar-logo__item']} href='/'>
        {NAVBAR.LOGO}
      </a>
    </div>
    <div className={styles['links']}>
      <a className={styles['links__item']} href='/'>
        {NAVBAR.DASHBOARD}
      </a>
      <a className={styles['links__item']} href='/departments'>
        {NAVBAR.DEPARTMENTS}
      </a>
      <a className={styles['links__item']} href='/staff'>
        {NAVBAR.STAFF}
      </a>
    </div>
  </nav>
);
export default Navbar;
