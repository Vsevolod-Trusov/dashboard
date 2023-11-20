import { FC } from 'react';

import { NO_DATA } from 'common';
import { styles as dashboardStyles } from 'pages/Dashboard';
import { useSelector } from 'react-redux';
import { selectStatistics } from 'store';

import {
  COMPANIES_LABEL,
  DEPARTMENTS_LABEL,
  STAFF_LABEL,
  STATISTICS_TITLE,
} from './constants';
import styles from './styles';

const Statistics: FC = () => {
  const { companiesCount, departmentsCount, staffCount } =
    useSelector(selectStatistics);

  return (
    <div className={styles['info-panel']}>
      <div className={dashboardStyles['dashboard-title']}>
        <h2 className={dashboardStyles['dashboard-title__item']}>
          {STATISTICS_TITLE}
        </h2>
      </div>
      <div className={styles['info-panel-wrapper']}>
        {!companiesCount && !departmentsCount && !staffCount ? (
          <p className={styles['no-data-item']}>{NO_DATA}</p>
        ) : (
          <>
            <div className={styles['statistics-content']}>
              <div>{COMPANIES_LABEL}</div>
              <div>{companiesCount}</div>
            </div>
            <div className={styles['statistics-content']}>
              <div>{DEPARTMENTS_LABEL}</div>
              <div>{departmentsCount}</div>
            </div>
            <div className={styles['statistics-content']}>
              <div>{STAFF_LABEL}</div>
              <div>{staffCount}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Statistics;
