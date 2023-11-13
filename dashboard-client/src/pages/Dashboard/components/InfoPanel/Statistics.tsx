import { FC, useContext } from 'react';

import { StatisticsContext } from 'context';
import { styles as dashboardStyles } from 'pages/Dashboard';

import {
  COMPANIES_LABEL,
  DEPARTMENTS_LABEL,
  STAFF_LABEL,
  STATISTICS_TITLE,
} from './constants';
import styles from './styles';

const Statistics: FC = () => {
  const { companiesCount, departmentsCount, staffCount } =
    useContext(StatisticsContext);

  return (
    <div className={styles['info-panel']}>
      <div className={dashboardStyles['dashboard-title']}>
        <h2 className={dashboardStyles['dashboard-title__item']}>
          {STATISTICS_TITLE}
        </h2>
      </div>
      <div className={styles['info-panel-wrapper']}>
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
      </div>
    </div>
  );
};

export default Statistics;
