import { enqueueSnackbar } from 'notistack';
import { FC } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { NAVBAR, NOTISTACK_DURATION, ROUTES } from 'common';

import styles from './styles';

const Navbar: FC = () => {
  const removeCookie = useCookies(['user'])[2];
  const navigate = useNavigate();
  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar-logo']}>
        <a
          className={styles['navbar-logo__item']}
          onClick={() => navigate(ROUTES.MAIN)}
        >
          <i className='bi bi-radar' />
          <span>{NAVBAR.LOGO}</span>
        </a>
      </div>
      <div className={styles['links-wrapper']}>
        <div className={styles['links-container']}>
          <div className={styles['links-container']}>
            <a
              className={styles['links-container__item']}
              onClick={() => navigate(ROUTES.MAIN)}
            >
              {NAVBAR.DASHBOARD}
            </a>
            <a
              className={styles['links-container__item']}
              href={ROUTES.DEPARTMENTS}
            >
              {NAVBAR.DEPARTMENTS}
            </a>
            <a
              className={styles['links-container__item']}
              onClick={() => navigate(ROUTES.STAFF)}
            >
              {NAVBAR.STAFF}
            </a>
            <a
              className={styles['links-container__item']}
              onClick={() => navigate(ROUTES.SIGN_IN)}
            >
              {NAVBAR.SIGN_IN}
            </a>
          </div>
          <div
            className={`${styles['links-container']} ${styles['container-small']} ${styles['layout']}`}
          >
            <a
              className={styles['links-container__item']}
              onClick={() => navigate(ROUTES.CREATE_STAFF)}
            >
              <i
                className={`bi bi-person-add ${styles['links-container__item']} ${styles['links-container-icon']}`}
              />
            </a>
            <a
              className={styles['links-container__item']}
              onClick={() => navigate(ROUTES.CREATE_DEPARTMENT)}
            >
              <i
                className={`bi bi-window-plus ${styles['links-container__item']} ${styles['links-container-icon']}`}
              />
            </a>
            <a
              className={styles['links-container__item']}
              onClick={() => navigate(ROUTES.CREATE_COMPANY)}
            >
              <i
                className={`bi bi-building-add ${styles['links-container__item']} ${styles['links-container-icon']}`}
              />
            </a>
            <a
              className={styles['links-container__item']}
              onClick={() => {
                removeCookie('user');
                enqueueSnackbar('Logout successfully', {
                  variant: 'success',
                  autoHideDuration: NOTISTACK_DURATION,
                });
              }}
            >
              <i
                className={`bi bi-box-arrow-right ${styles['links-container__item']} ${styles['links-container-icon']}`}
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
